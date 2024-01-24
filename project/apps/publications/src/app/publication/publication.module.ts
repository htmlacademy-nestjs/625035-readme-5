import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/publications/models';

import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { PublicationService } from './publication.service';

@Module({
  controllers: [PublicationController],
  imports: [PrismaClientModule],
  providers: [PublicationService, PublicationRepository],
})
export class PublicationModule {}
