import { BasePostgresRepository } from '@project/shared/core';

import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationEntityAny } from './publication.entity';
import { PrismaClientService } from '@project/shared/publications/models';
import { PublicationAny } from '@project/shared/shared-types';
import { MAX_PUBLICATIONS_LIMIT } from './publication.constant';
import { PublicationEntityFactory } from './publication-entity.factory';
import { Prisma, PublicationState, PublicationType } from '@prisma/client';

@Injectable()
export class PublicationRepository extends BasePostgresRepository<
  PublicationEntityAny,
  PublicationAny
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, PublicationEntityFactory);
  }

  private async getPublicationCount(
    where: Prisma.PublicationWhereInput
  ): Promise<number> {
    return this.client.publication.count({ where });
  }

  public async save(
    entity: PublicationEntityAny
  ): Promise<PublicationEntityAny> {
    const pojo = entity.toPOJO();
    // ? initially tags, might not have an id?
    // ? or tags should be prefilled and picked correctly from the FE?
    // ? what will happen if tag doesn't have an id in it
    const record = await this.client.publication.create({
      data: {
        ...pojo,
        comments: { connect: [] },
        likes: {
          connect: [],
        },
        reposts: {
          connect: [],
        },
        tags: {
          connect: pojo.tags.map(({ id }) => ({ id })),
        },
      },
      include: {
        comments: true,
        likes: true,
        tags: true,
      },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<PublicationEntityAny> {
    const record = await this.client.publication.findFirst({
      where: {
        id,
      },
      include: {
        comments: true,
        likes: true,
        tags: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Publication with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record);
  }

  public async getAll(filter?: {
    userId?: string;
    page: number;
    orderBy?: {
      createdAt: 'asc' | 'desc';
    };
    type: PublicationType;
  }): Promise<PublicationEntityAny[]> {
    const { userId, page, orderBy = { createdAt: 'asc' }, type } = filter;

    const skip = (page - 1) * MAX_PUBLICATIONS_LIMIT;

    const where = {
      state: PublicationState.publication,
      userId,
      type,
    };

    const documents = await this.client.publication.findMany({
      skip,
      take: MAX_PUBLICATIONS_LIMIT,
      where,
      include: {
        comments: true,
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
        tags: true,
      },
      orderBy,
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async update(
    id: string,
    postEntity: PublicationEntityAny
  ): Promise<PublicationEntityAny> {
    // ? should we use this endpoint in order to set tags, comments
    const { comments, likes, reposts, tags, ...data } = postEntity.toPOJO();

    const updatedPost = await this.client.publication.update({
      where: { id },
      include: {
        comments: true,
        likes: true,
        reposts: true,
        tags: true,
      },
      data: {
        ...data,
        tags: {
          set: tags.map((tag) => ({
            id: tag.id,
            value: tag.value,
            publicationId: id,
          })),
        },
      },
    });

    return this.createEntityFromDocument(updatedPost);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.publication.delete({
      where: {
        id,
      },
    });
  }

  public async findByIds(ids: string[]): Promise<PublicationEntityAny[]> {
    const records = await this.client.publication.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
