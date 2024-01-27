import { Module, forwardRef } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { PrismaClientModule } from '@project/shared/publications/models';
import { PublicationModule } from '../publication/publication.module';
import { TagRepository } from './tag.repository';

@Module({
  controllers: [TagController],
  exports: [TagService],
  imports: [PrismaClientModule, forwardRef(() => PublicationModule)],
  providers: [TagService, TagRepository],
})
export class TagModule {}
