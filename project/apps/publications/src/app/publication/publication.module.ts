import { Module } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';

@Module({
  controllers: [PublicationController],
  exports: [],
  imports: [],
  providers: [PublicationService, PublicationRepository],
})
export class PublicationModule {}
