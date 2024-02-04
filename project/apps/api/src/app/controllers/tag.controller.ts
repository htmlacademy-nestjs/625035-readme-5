import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { ApplicationServiceURL } from '../app.config';
import { UserIdInterceptor } from '../interceptors/user-id-interceptor';
import { CreateTagDto } from '../dto/create-tag.dto';

@ApiTags('Tags routes')
@Controller('tags')
@UseFilters(AxiosExceptionFilter)
export class TagsController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list of tags',
  })
  @Get('/')
  public async index(@Query('ids') ids: string[] = []) {
    try {
      const { data } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Tags}`,
        {
          params: { ids },
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

  @ApiResponse({
    description: 'Get tag by id',
  })
  @Get(':id')
  public async getById(
    @Param('id')
    id: string
  ) {
    try {
      const { data } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Tags}/${id}`
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
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(
    @Body()
    dto: CreateTagDto
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Tags}`,
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
}
