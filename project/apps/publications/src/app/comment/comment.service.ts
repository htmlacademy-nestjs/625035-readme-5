import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './comment.repository';
import { PublicationService } from '../publication/publication.service';
import { CommentEntity } from './comment.entity';
import { CommentQuery } from './query/comment.query';
import { PaginationResult } from '@project/shared/shared-types';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly publicationService: PublicationService
  ) {}

  public async create(publicationId: string, dto: CreateCommentDto) {
    const existPublication = await this.publicationService.getPublication(
      publicationId
    );
    const newComment = CommentEntity.fromDto(dto, existPublication.id);

    return this.commentRepository.save(newComment);
  }

  public async getComments(
    publicationId: string,
    query: CommentQuery
  ): Promise<PaginationResult<CommentEntity>> {
    return await this.commentRepository.findByPublicationId(
      publicationId,
      query
    );
  }

  public async deleteComment(id: string, userId: string) {
    const existsComment = await this.commentRepository.findById(id);

    if (existsComment?.userId !== userId) {
      throw new UnauthorizedException(
        `Comment owner is not user with userId: ${userId}`
      );
    }

    try {
      await this.commentRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
  }
}
