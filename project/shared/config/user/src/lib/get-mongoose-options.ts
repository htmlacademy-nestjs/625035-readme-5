import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from '@project/shared/helpers';

export const getMongooseOptions = (): MongooseModuleAsyncOptions => ({
  useFactory: async (config: ConfigService) => ({
    uri: getMongoConnectionString({
      authDatabase: config.get<string>('db.authBase'),
      databaseName: config.get<string>('db.name'),
      host: config.get<string>('db.host'),
      password: config.get<string>('db.password'),
      port: config.get<string>('db.port'),
      username: config.get<string>('db.user'),
    }),
  }),
  inject: [ConfigService],
});
