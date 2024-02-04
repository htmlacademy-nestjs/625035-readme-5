import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';

import { PublicationRepository } from './publication.repository';
import { PublicationEntityAny } from './publication.entity';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { publicationEntityAdapter } from './publication-entity.factory';
import { CreatePublicationDtoType } from './dto/create-publication.dto';
import { PublicationQuery } from './query/publication.query';
import { PaginationResult } from '@project/shared/shared-types';
import { TagService } from '../tag/tag.service';
import { PublicationType } from '@prisma/client';

@Injectable()
export class PublicationService {
  constructor(
    @Inject(forwardRef(() => TagService))
    private readonly tagsService: TagService,
    private readonly publicationRepository: PublicationRepository
  ) {}

  public async createPublication(dto: CreatePublicationDtoType) {
    const tags = await this.tagsService.findByIds(dto.tags);
    const publicationEntity = publicationEntityAdapter[dto.type].fromDto(
      // todo: fix type issue
      // @ts-ignore
      dto,
      tags
    );

    return await this.publicationRepository.save(publicationEntity);
  }

  public async getPublication(id: string) {
    const existPost = await this.publicationRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(`Publication ${id} not found`);
    }

    return existPost;
  }

  public async getPublications(
    query?: PublicationQuery
  ): Promise<PaginationResult<PublicationEntityAny>> {
    return await this.publicationRepository.findMany(query);
  }

  public async deletePublication(id: string, userId: string) {
    const existsPost = await this.publicationRepository.findById(id);

    if (existsPost?.authorId !== userId) {
      throw new UnauthorizedException(
        `Post owner is not user with user id: ${userId}`
      );
    }
    try {
      return await this.publicationRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }
  }

  public async updatePublication(id: string, dto: UpdatePublicationDto) {
    const tags = dto.tags ? await this.tagsService.findByIds(dto.tags) : [];
    const existsPost = await this.publicationRepository.findById(id);

    if (existsPost?.authorId !== dto.authorId) {
      throw new UnauthorizedException(
        `Post owner is not user with user id: ${dto.authorId}`
      );
    }

    const blogCategoryEntity = publicationEntityAdapter[dto.type].fromDto(
      // ! todo: how to fix dto type here
      // @ts-ignore
      dto,
      tags
    );

    try {
      return await this.publicationRepository.update(id, blogCategoryEntity);
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  public async searchPublications(
    title: string
  ): Promise<PublicationEntityAny[]> {
    return await this.publicationRepository.search(title);
  }
}
