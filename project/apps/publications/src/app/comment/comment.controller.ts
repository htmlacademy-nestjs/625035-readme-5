import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('publications/:publicationId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/')
  public async create(
    @Param('publicationId') publicationId: string,
    @Body() dto: CreateCommentDto
  ) {
    const comment = await this.commentService.create(publicationId, dto);
    return fillDto(CommentRdo, comment.toPOJO());
  }

  @Get('/')
  public async show(@Param('publicationId') publicationId: string) {
    const comments = await this.commentService.getComments(publicationId);
    return fillDto(
      CommentRdo,
      comments.map((comment) => comment.toPOJO())
    );
  }
}
