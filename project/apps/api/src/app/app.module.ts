import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import {
  FileController,
  PublicationController,
  TagsController,
  UsersController,
} from './controllers';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [
    FileController,
    PublicationController,
    TagsController,
    UsersController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
