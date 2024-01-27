import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { PublicationType } from '@prisma/client';

import { PublicationRepository } from './publication.repository';
import { PublicationEntityAny } from './publication.entity';
import { UpdatePublicationDto } from './dto/edit-publication.dto';
import { publicationEntityAdapter } from './publication-entity.factory';
import { CreatePublicationDtoType } from './dto/create-publication.dto';
import { PublicationQuery } from './query/publication.query';
import { PaginationResult } from '@project/shared/shared-types';
import { TagService } from '../tag/tag.service';

@Injectable()
export class PublicationService {
  constructor(
    @Inject(forwardRef(() => TagService))
    private readonly tagsService: TagService,
    private readonly publicationRepository: PublicationRepository
  ) {}

  public async createPublication(
    dto: CreatePublicationDtoType,
    type: PublicationType
  ) {
    const tags = await this.tagsService.findByIds(dto.tags);
    // ! todo: how to fix dto type here
    // @ts-ignore
    const publicationEntity = publicationEntityAdapter[type].fromDto(dto, tags);
    this.publicationRepository.save(publicationEntity);

    return publicationEntity;
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

  //* common for any type of publication
  public async deletePublication(id: string) {
    return this.publicationRepository.deleteById(id);
  }

  // ! todo: Rework
  public async updatePublication(id: string, dto: UpdatePublicationDto) {
    const tags = await this.tagsService.findByIds(dto.tags);

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
}
