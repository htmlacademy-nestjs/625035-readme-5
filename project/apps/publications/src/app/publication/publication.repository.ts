import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/shared/core';
import { Prisma } from '@prisma/client';
import { PrismaClientService } from '@project/shared/publications/models';
import { PaginationResult, PublicationAny } from '@project/shared/shared-types';

import { PublicationEntityAny } from './publication.entity';
import {
  MAX_PUBLICATIONS_LIMIT,
  PUBLICATIONS_REQUEST_COUNT,
  PUBLICATION_SEARCH_BY_TITLE_LIMIT,
} from './publication.constant';
import { PublicationEntityFactory } from './publication-entity.factory';
import { PublicationQuery } from './query/publication.query';

@Injectable()
export class PublicationRepository extends BasePostgresRepository<
  PublicationEntityAny,
  PublicationAny
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, PublicationEntityFactory);
  }

  private calculatePublicationsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
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

    return this.createEntityFromDocument(record);
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

  public async findMany(
    filter?: PublicationQuery
  ): Promise<PaginationResult<PublicationEntityAny>> {
    const { page, sortBy, tags, type, authorId } = filter;

    const hasTag = tags?.length ? { some: { id: { in: tags } } } : undefined;
    const where = {
      isPublished: true,
      authorId,
      type,
      tags: hasTag,
    };
    const skip = (page - 1) * MAX_PUBLICATIONS_LIMIT;
    const orderBy: Prisma.PublicationOrderByWithRelationInput = {
      [sortBy]: 'asc',
    };

    const [records, total] = await Promise.all([
      this.client.publication.findMany({
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
      }),
      this.getPublicationCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: filter?.page,
      totalPages: this.calculatePublicationsPage(
        total,
        PUBLICATIONS_REQUEST_COUNT
      ),
      itemsPerPage: PUBLICATIONS_REQUEST_COUNT,
      totalItems: total,
    };
  }

  public async update(
    id: string,
    postEntity: PublicationEntityAny
  ): Promise<PublicationEntityAny> {
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
          connect: tags.map((tag) => ({
            id: tag.id,
          })),
        },
        comments: {
          connect: comments.map((comment) => ({
            id: comment.id,
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

  public async search(title: string): Promise<PublicationEntityAny[]> {
    const records = await this.client.publication.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      take: PUBLICATION_SEARCH_BY_TITLE_LIMIT,
      include: {
        tags: true,
        comments: true,
        likes: true,
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
