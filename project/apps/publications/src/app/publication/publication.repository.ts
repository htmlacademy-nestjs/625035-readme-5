import { BasePostgresRepository } from '@project/shared/core';

import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PublicationEntityAny,
  VideoPublicationEntity,
} from './publication.entity';
import { PrismaClientService } from '@project/shared/publications/models';
import { PublicationAny, PublicationState } from '@project/shared/shared-types';
import { MAX_PUBLICATIONS_LIMIT } from './publication.constant';
import { PublicationEntityFactory } from './publication-entity.factory';

@Injectable()
export class PublicationRepository extends BasePostgresRepository<
  PublicationEntityAny,
  PublicationAny
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, PublicationEntityFactory);
  }

  public async save(
    entity: PublicationEntityAny
  ): Promise<PublicationEntityAny> {
    const record = await this.client.publication.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<VideoPublicationEntity> {
    const record = await this.client.videoPublication.findFirst({
      where: {
        id,
      },
    });

    if (!record) {
      throw new NotFoundException(`Publication with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record);
  }

  public async getAll(filter): Promise<VideoPublicationEntity[]> {
    const { userId, page, orderBy = { createdAt: 'asc' }, type } = filter;

    const skip = (page - 1) * MAX_PUBLICATIONS_LIMIT;

    const where = {
      state: PublicationState.Publication,
      userId,
      type,
    };

    const documents = await this.client.publication.findMany({
      skip,
      take: MAX_PUBLICATIONS_LIMIT,
      where,
      include: { comments: true, likes: true, tags: true },
      orderBy,
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.publication.delete({
      where: {
        id,
      },
    });
  }
}
