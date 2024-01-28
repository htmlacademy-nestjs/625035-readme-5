import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './app.config';
import mongoConfig from './mongo.config';
import jwtConfig from './jwt.config';
import rabbitConfig from './rabbit.config';

const ENV_USER_FILE_PATH = 'apps/user/user.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_USER_FILE_PATH,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigUserModule {}
