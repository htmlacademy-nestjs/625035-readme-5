import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/publications/models';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PublicationModule } from '../publication/publication.module';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [PrismaClientModule, PublicationModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
