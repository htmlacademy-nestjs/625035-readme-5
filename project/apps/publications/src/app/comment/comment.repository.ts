import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/shared/core';
import { Comment } from '@project/shared/shared-types';
import { PrismaClientService } from '@project/shared/publications/models';

import { CommentEntity } from './comment.entity';
import { MAX_COMMENTS_COUNT } from './comment.constant';

@Injectable()
export class CommentRepository extends BasePostgresRepository<
  CommentEntity,
  Comment
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, CommentEntity.fromObject);
  }

  public async save(entity: CommentEntity): Promise<CommentEntity> {
    const record = await this.client.comment.create({
      data: {
        value: entity.value,
        userId: entity.userId,
        publicationId: entity.publicationId,
      },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<CommentEntity> {
    const record = await this.client.comment.findFirst({
      where: {
        id,
      },
      take: MAX_COMMENTS_COUNT,
    });

    if (!record) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record);
  }

  public async findByPublicationId(
    publicationId: string
  ): Promise<CommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: {
        publicationId,
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
