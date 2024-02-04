import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentQuery } from './query/comment.query';
import { CommentWithPaginationRdo } from './rdo/comment-with-pagination.rdo';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { RequestWithTokenPayload } from '@project/shared/shared-types';

@ApiTags('comments')
@Controller('publications/:publicationId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a new comment for a publication',
  })
  @UseGuards(CheckAuthGuard)
  @Post('/')
  public async create(
    @Param('publicationId') publicationId: string,
    @Body() dto: CreateCommentDto
  ) {
    const comment = await this.commentService.create(publicationId, dto);
    return fillDto(CommentRdo, comment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Show comments for publication',
  })
  @Get('/')
  public async show(
    @Param('publicationId') publicationId: string,
    @Query()
    query: CommentQuery
  ) {
    const comments = await this.commentService.getComments(
      publicationId,
      query
    );

    const result = {
      ...comments,
      entities: comments.entities.map((post) => post.toPOJO()),
    };

    return fillDto(CommentWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete comment by id',
  })
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(
    @Param('id')
    id: string,
    @Req() { user }: RequestWithTokenPayload
  ) {
    await this.commentService.deleteComment(id, user.sub);
  }
}
