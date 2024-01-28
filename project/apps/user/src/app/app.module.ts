import { Module } from '@nestjs/common';
import {
  ConfigUserModule,
  getMongooseOptions,
} from '@project/shared/config/user';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthenticationModule } from './authentication/authentication.module';
import { BlogUserModule } from './blog-user/blog-user.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    ConfigUserModule,
    NotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
