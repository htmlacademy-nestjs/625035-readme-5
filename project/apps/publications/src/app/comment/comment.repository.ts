import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/shared/core';
import { Comment, PaginationResult } from '@project/shared/shared-types';
import { PrismaClientService } from '@project/shared/publications/models';

import { CommentEntity } from './comment.entity';
import { CommentQuery } from './query/comment.query';

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
        publicationId: entity.publicationId,
        userId: entity.userId,
        value: entity.value,
      },
    });

    return this.createEntityFromDocument(record);
  }

  public async findById(id: string): Promise<CommentEntity> {
    const record = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!record) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record);
  }

  public async findByPublicationId(
    publicationId: string,
    query: CommentQuery
  ): Promise<PaginationResult<CommentEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;

    const [records, count] = await Promise.all([
      this.client.comment.findMany({
        where: {
          publicationId,
        },
        skip,
        take,
      }),
      this.client.comment.count({
        where: {
          publicationId,
        },
      }),
    ]);

    return {
      currentPage: query?.page,
      entities: records.map((record) => this.createEntityFromDocument(record)),
      itemsPerPage: take,
      totalItems: count,
      totalPages: Math.ceil(count / take),
    };
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }
}
