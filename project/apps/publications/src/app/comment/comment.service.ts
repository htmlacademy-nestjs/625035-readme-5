import { Injectable } from '@nestjs/common';

import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './comment.repository';
import { PublicationService } from '../publication/publication.service';
import { CommentEntity } from './comment.entity';

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

  public async getComments(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.findByPublicationId(postId);
  }
}
