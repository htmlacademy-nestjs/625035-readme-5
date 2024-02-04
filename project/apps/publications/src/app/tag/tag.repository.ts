import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/shared/core';
import { Tag } from '@project/shared/shared-types';
import { PrismaClientService } from '@project/shared/publications/models';

import { TagEntity } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagRepository extends BasePostgresRepository<TagEntity, Tag> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, TagEntity.fromObject);
  }

  public async findMany(values: string[]): Promise<TagEntity[]> {
    const documents = await this.client.tag.findMany({
      where: {
        value: {
          in: values,
        },
      },
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async saveTags(dto: CreateTagDto): Promise<TagEntity[]> {
    await this.client.tag.createMany({
      data: dto.values.map((value) => ({ value })),
      skipDuplicates: true,
    });

    return await this.findMany(dto.values);
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

  public async findByIds(ids?: string[]): Promise<TagEntity[]> {
    const where: Prisma.TagWhereInput = {};

    if (ids.length) {
      where.id = {
        in: ids,
      };
    }

    const records = await this.client.tag.findMany({
      where,
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
