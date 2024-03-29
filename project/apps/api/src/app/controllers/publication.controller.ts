import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { UserIdInterceptor } from '../interceptors/user-id-interceptor';
import { ApplicationServiceURL } from '../app.config';
import { SearchPublicationDto } from '../dto/publication/search-publication.dto';
import { UserIdDto } from '../dto/user-id.dto';
import { UpdatePublicationDto } from '../dto/publication/update-publication.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentFilterQuery } from '../query/comment.query';
import { CreatePublicationDto } from '../dto/publication/add-new-publication.dto';
import { PublicationQuery } from '../query/publication.query';

@ApiTags('Publications routes')
@Controller('publications')
@UseFilters(AxiosExceptionFilter)
export class PublicationController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Search by title',
  })
  @Get('/search')
  public async search(
    @Query()
    query: SearchPublicationDto
  ) {
    try {
      const { data } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Publications}/search?${query.title}`
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
    status: HttpStatus.OK,
    description: 'The following posts have been found.',
  })
  @Get('/')
  public async index(@Query() filter: PublicationQuery) {
    try {
      const { data } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Publications}`,
        { params: filter }
      );

      const userIds = new Set();

      data?.entities?.forEach((item) => {
        userIds.add(item.userId);
      });

      const { data: users } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Auth}/info`,
        { params: Array.from(userIds) }
      );

      const newEntities = data.entities.map((publication) => ({
        ...publication,
        user: users[publication.authorId],
      }));

      return { ...data, entities: newEntities };
    } catch (err) {
      if (err.response.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException('Publication not found');
      }
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(
    @Body()
    dto: CreatePublicationDto
  ) {
    try {
      const tagsRes = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Tags}`,
        { values: dto.tags }
      );

      dto.tags = tagsRes.data.map((item) => item.id);
      dto.authorId = dto.userId;

      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Publications}`,
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
  @UseInterceptors(UserIdInterceptor)
  @Get('/:id')
  public async details(
    @Param('id')
    id: string,
    @Req()
    request: Request
  ) {
    try {
      const { data } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Publications}/${id}`,
        {
          headers: {
            Authorization: request.headers['authorization'],
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

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch('/:id')
  public async update(
    @Param('id')
    id: string,
    @Body()
    dto: UpdatePublicationDto
  ) {
    try {
      const res = await this.httpService.axiosRef.patch(
        `${ApplicationServiceURL.Publications}/${id}`,
        dto
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
  @Delete('/:id')
  public async delete(
    @Param('id')
    id: string,
    @Body()
    dto: UserIdDto
  ) {
    try {
      const res = await this.httpService.axiosRef.delete(
        `${ApplicationServiceURL.Publications}/${id}`,
        {
          data: {
            userId: dto.userId,
          },
        }
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
  @Post(':publicationId/likes/')
  public async like(
    @Param('publicationId')
    publicationId: string,
    @Body()
    dto: UserIdDto,
    @Req()
    request: Request
  ) {
    try {
      const res = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Publications}/${publicationId}/likes`,
        dto,
        {
          headers: {
            Authorization: request.headers['authorization'],
          },
        }
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
  @Delete(':publicationId/likes')
  public async removeLike(
    @Param('publicationId')
    publicationId: string,
    @Body()
    dto: UserIdDto,
    @Req()
    request: Request
  ) {
    try {
      const res = await this.httpService.axiosRef.delete(
        `${ApplicationServiceURL.Publications}/${publicationId}/likes`,
        {
          data: dto,
          headers: {
            Authorization: request.headers['authorization'],
          },
        }
      );

      return res.data;
    } catch ({ response }) {
      throw new HttpException(
        response?.data?.message,
        response?.data?.statusCode
      );
    }
  }

  @Get('/:publicationId/comments')
  public async comments(
    @Param('publicationId')
    publicationId: string,
    @Query()
    query: CommentFilterQuery
  ) {
    try {
      const { data } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Publications}/${publicationId}/comments?page=${query.page}&limit=${query.limit}`
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
  @Post('/:publicationId/comments')
  public async comment(
    @Param('publicationId')
    publicationId: string,
    @Body()
    dto: CreateCommentDto,
    @Req()
    request: Request
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Publications}/${publicationId}/comments`,
        dto,
        {
          headers: {
            Authorization: request.headers['authorization'],
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

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Delete('/:publicationId/comments/:id')
  public async deleteComment(
    @Param('publicationId')
    publicationId: string,
    @Param('id')
    id: string,
    @Body()
    dto: UserIdDto,
    @Req()
    request: Request
  ) {
    try {
      const { data } = await this.httpService.axiosRef.delete(
        `${ApplicationServiceURL.Publications}/${publicationId}/comments/${id}`,
        {
          data: {
            userId: dto.userId,
          },
          headers: {
            Authorization: request.headers['authorization'],
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
