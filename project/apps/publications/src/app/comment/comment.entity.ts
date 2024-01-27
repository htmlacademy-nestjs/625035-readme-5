import { Entity } from '@project/shared/core';
import { Comment } from '@project/shared/shared-types';
import { CreateCommentDto } from './dto/create-comment.dto';

export class CommentEntity implements Comment, Entity<string, Comment> {
  public id?: string;
  public publicationId?: string;
  public userId: string;
  public value: string;

  public populate(data: Comment): CommentEntity {
    this.id = data.id;
    this.publicationId = data.publicationId;
    this.userId = data.userId;
    this.value = data.value;

    return this;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      publicationId: this.publicationId,
      userId: this.userId,
      value: this.value,
    };
  }

  static fromObject(data: Comment): CommentEntity {
    return new CommentEntity().populate(data);
  }

  static fromDto(dto: CreateCommentDto, publicationId: string): CommentEntity {
    return new CommentEntity().populate({
      ...dto,
      publicationId,
    });
  }
}
