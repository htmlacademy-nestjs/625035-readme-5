import { Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import {
  CreateLinkPublicationDto,
  CreatePhotoPublicationDto,
  CreateQuotePublicationDto,
  CreateTextPublicationDto,
  CreateVideoPublicationDto,
} from './dto/create-publication.dto';
import {
  LinkPublicationEntity,
  PhotoPublicationEntity,
  QuotePublicationEntity,
  TextPublicationEntity,
  VideoPublicationEntity,
} from './publication.entity';
import { UpdatePublicationDto } from './dto/edit-publication.dto';
import { BasePostgresRepository } from '@project/shared/core';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  public async createPublication(dto: CreateVideoPublicationDto) {
    // const publicationEntity = await new VideoPublicationEntity(dto);

    return this.publicationRepository.save(dto);
  }

  //* should consolidate all the publications
  //? should this be done here? or somehow in the repository
  public async getPublications() {
    return this.publicationRepository.getAll();
  }

  //* common for any type of publication
  public async deletePublication(id: string) {
    return this.publicationRepository.deleteById(id);
  }

  // todo: Rework
  public async updatePublication(
    id: string,
    publication: UpdatePublicationDto
  ) {
    return `update ${id} with ${JSON.stringify(publication)}`;
  }
}
