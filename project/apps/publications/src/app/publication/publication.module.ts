import { Module } from '@nestjs/common';
import {
  LinkRepository,
  PhotoRepository,
  PublicationRepository,
  QuoteRepository,
  TextRepository,
  VideoRepository,
} from './publication.repository';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';

@Module({
  controllers: [PublicationController],
  exports: [],
  imports: [],
  providers: [
    PublicationService,
    PublicationRepository,
    VideoRepository,
    TextRepository,
    QuoteRepository,
    PhotoRepository,
    LinkRepository,
  ],
})
export class PublicationModule {}
