import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { PaginationResult } from '@project/shared/shared-types';
import { MongoIdValidationPipe } from '@project/shared/core';

import { ApplicationServiceURL } from '../app.config';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { CheckNewUserGuard } from '../guards/check-no-auth.guard';
import { UserIdInterceptor } from '../interceptors/user-id-interceptor';

import { PublicationRdo, UserRdo } from '../rdo';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
  UserIdDto,
} from '../dto';

@ApiTags('Users routes')
@Controller('auth')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return a user',
  })
  @Get('/:id')
  public async show(
    @Param('id', MongoIdValidationPipe)
    id: string,
    @Req()
    request: Request
  ) {
    try {
      const { data: user } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Auth}/${id}`,
        {
          headers: {
            Authorization: request.headers['authorization'],
          },
        }
      );
      const { data: publications } = await this.httpService.axiosRef.get<
        PaginationResult<PublicationRdo>
      >(`${ApplicationServiceURL.Publications}`, {
        params: {
          authorId: id,
        },
      });

      return { ...user, publications: publications.totalItems };
    } catch ({ response }) {
      throw new HttpException(
        response?.data?.message,
        response?.data?.statusCode
      );
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Creates a user',
    type: UserRdo,
  })
  @UseGuards(CheckNewUserGuard)
  @Post('register')
  public async register(
    @Body()
    dto: CreateUserDto
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Auth}/register`,
        dto
      );

      return data;
    } catch ({ response }) {
      throw new HttpException(
        response?.data?.message,
        response?.data?.statusCode
      );
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(FileInterceptor('file'), UserIdInterceptor)
  @Post('/avatar')
  public async avatar(
    @UploadedFile()
    file: Express.Multer.File,
    @Body()
    dto: UserIdDto
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Files}/upload-info`,
        { ...file, buffer: file.buffer.toString('hex') }
      );

      const avatar = {
        avatar: `${data.subDirectory}/${data.hashName}`,
        userId: dto.userId,
      };

      const res = await this.httpService.axiosRef.patch(
        `${ApplicationServiceURL.Auth}/update`,
        avatar
      );

      return res.data;
    } catch ({ response }) {
      throw new HttpException(
        response?.data?.message,
        response?.data?.statusCode
      );
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch('update')
  public async update(
    @Body()
    dto: UpdateUserDto
  ) {
    try {
      const { data } = await this.httpService.axiosRef.patch(
        `${ApplicationServiceURL.Auth}/update`,
        dto
      );

      return data;
    } catch ({ response }) {
      throw new HttpException(
        response?.data?.message,
        response?.data?.statusCode
      );
    }
  }

  @Post('login')
  public async login(
    @Body()
    dto: LoginUserDto
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Auth}/login`,
        dto
      );

      return data;
    } catch (res) {
      throw new HttpException(
        res.response?.data?.message,
        res.response?.data?.statusCode
      );
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('reset-password')
  public async resetPassword(
    @Body()
    dto: ChangePasswordDto
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Auth}/reset-password`,
        dto
      );

      return data;
    } catch ({ response }) {
      throw new HttpException(
        response?.data?.message,
        response?.data?.statusCode
      );
    }
  }

  @Post('refresh')
  public async refreshToken(
    @Req()
    req: Request
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Auth}/refresh`,
        null,
        {
          headers: {
            Authorization: req.headers['authorization'],
          },
        }
      );

      return data;
    } catch ({ response }) {
      throw new HttpException(
        response?.data?.message,
        response?.data?.statusCode
      );
    }
  }
}
