import { BaseMemoryRepository } from '@project/shared/core';

import { Injectable } from '@nestjs/common';
import {
  LinkPublicationEntity,
  PhotoPublicationEntity,
  PublicationEntity,
  QuotePublicationEntity,
  TextPublicationEntity,
  VideoPublicationEntity,
} from './publication.entity';

@Injectable()
export class PublicationRepository extends BaseMemoryRepository<PublicationEntity> {}

@Injectable()
export class VideoRepository extends BaseMemoryRepository<VideoPublicationEntity> {}

@Injectable()
export class TextRepository extends BaseMemoryRepository<TextPublicationEntity> {}

@Injectable()
export class QuoteRepository extends BaseMemoryRepository<QuotePublicationEntity> {}

@Injectable()
export class PhotoRepository extends BaseMemoryRepository<PhotoPublicationEntity> {}

@Injectable()
export class LinkRepository extends BaseMemoryRepository<LinkPublicationEntity> {}
