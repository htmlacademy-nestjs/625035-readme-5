import { Module, forwardRef } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/publications/models';

import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { PublicationService } from './publication.service';
import { TagModule } from '../tag/tag.module';

@Module({
  controllers: [PublicationController],
  exports: [PublicationService],
  imports: [PrismaClientModule, forwardRef(() => TagModule)],
  providers: [PublicationService, PublicationRepository],
})
export class PublicationModule {}
