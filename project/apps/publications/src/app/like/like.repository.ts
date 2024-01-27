import { Injectable, NotFoundException } from '@nestjs/common';

import { Like } from '@project/shared/shared-types';
import { BasePostgresRepository } from '@project/shared/core';

import { LikeEntity } from './like.entity';
import { PrismaClientService } from '@project/shared/publications/models';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, Like> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, LikeEntity.fromObject);
  }

  public async save(entity: LikeEntity): Promise<LikeEntity> {
    const record = await this.client.like.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
    return entity;
  }

  public async find(
    userId: string,
    publicationId: string
  ): Promise<LikeEntity> {
    const record = await this.client.like.findFirst({
      where: {
        publicationId,
        userId,
      },
    });

    return this.createEntityFromDocument(record);
  }

  public async findByIds(ids: string[]): Promise<LikeEntity[]> {
    const records = await this.client.like.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public async countLikes(publicationId: string): Promise<number> {
    return await this.client.like.count({
      where: {
        publicationId,
      },
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.like.delete({
      where: {
        id,
      },
    });
  }
}
