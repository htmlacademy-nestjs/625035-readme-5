import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { PrismaClientModule } from '@project/shared/publications/models';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from '../app.config';

@Module({
  imports: [
    PrismaClientModule,
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
  exports: [LikeRepository, LikeService],
})
export class LikeModule {}
