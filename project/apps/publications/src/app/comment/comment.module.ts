import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/publications/models';

import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PublicationModule } from '../publication/publication.module';
import { CommentRepository } from './comment.repository';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from '../app.config';

@Module({
  imports: [
    PrismaClientModule,
    PublicationModule,
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentService],
})
export class CommentModule {}
