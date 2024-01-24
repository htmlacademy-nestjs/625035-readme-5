import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationType } from '@prisma/client';

import { PublicationRepository } from './publication.repository';
import { PublicationEntity } from './publication.entity';
import { UpdatePublicationDto } from './dto/edit-publication.dto';
import { PublicationEntityAdapter } from './publication-entity.factory';
import { CreatePublicationDtoType } from './dto/create-publication.dto';

@Injectable()
export class PublicationService {
  // ! publicationRepository is not injected
  constructor(private readonly publicationRepository: PublicationRepository) {}

  public async createPublication(
    dto: CreatePublicationDtoType,
    type: PublicationType
  ) {
    const publicationEntity = new PublicationEntityAdapter[type]({
      ...dto,
      type,
    });

    return this.publicationRepository.save(publicationEntity);
  }
  public async getPublication(id: string) {
    const existPost = await this.publicationRepository.findById(id);

    if (!existPost) {
      throw new NotFoundException(`Publication ${id} not found`);
    }

    return existPost;
  }

  //* should consolidate all the publications
  //? should this be done here? or somehow in the repository
  //? how to get userId here?
  public async getPublications() {
    return await this.publicationRepository.getAll({
      page: 1,
      type: PublicationType.video,
    });
  }

  //* common for any type of publication
  public async deletePublication(id: string) {
    return this.publicationRepository.deleteById(id);
  }

  // todo: Rework
  public async updatePublication(id: string, dto: UpdatePublicationDto) {
    const blogCategoryEntity = new PublicationEntityAdapter[dto.type](dto);

    console.log('dto', dto);
    console.log('blogCategoryEntity', blogCategoryEntity);

    try {
      const updatedCategory = await this.publicationRepository.update(
        id,
        blogCategoryEntity
      );
      return updatedCategory;
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
