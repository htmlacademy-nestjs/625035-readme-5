import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/shared/core';
import { Tag } from '@project/shared/shared-types';
import { PrismaClientService } from '@project/shared/publications/models';

import { TagEntity } from './tag.entity';

@Injectable()
export class TagRepository extends BasePostgresRepository<TagEntity, Tag> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, TagEntity.fromObject);
  }

  public async saveTags(entities: TagEntity[]): Promise<TagEntity[]> {
    const manyTags = entities.map(async (entity) => {
      const tag = await this.client.tag.create({
        data: {
          value: entity.value,
          publicationId: entity.publicationId,
        },
      });

      entity.id = tag.id;
      return tag;
    });

    await Promise.all(manyTags);

    return entities;
  }

  public async findById(id: string): Promise<TagEntity> {
    const record = await this.client.tag.findFirst({
      where: {
        id,
      },
    });

    if (!record) {
      throw new NotFoundException(`Tag with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record);
  }

  public async findByPublicationId(
    publicationId: string
  ): Promise<TagEntity[]> {
    const records = await this.client.tag.findMany({
      where: {
        publicationId,
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public async findByIds(ids: string[]): Promise<TagEntity[]> {
    const records = await this.client.tag.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
