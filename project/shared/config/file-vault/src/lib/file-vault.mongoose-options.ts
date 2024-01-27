import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { getMongoConnectionString } from '@project/shared/helpers';

export const getMongooseOptions = (): MongooseModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    uri: getMongoConnectionString({
      authDatabase: config.get<string>('application.db.authBase'),
      databaseName: config.get<string>('application.db.name'),
      host: config.get<string>('application.db.host'),
      password: config.get<string>('application.db.password'),
      port: config.get<string>('application.db.port'),
      username: config.get<string>('application.db.user'),
    }),
  }),
});
