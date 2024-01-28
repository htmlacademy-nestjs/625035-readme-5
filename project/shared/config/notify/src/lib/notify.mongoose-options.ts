import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { getMongoConnectionString } from '@project/shared/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => ({
      uri: getMongoConnectionString({
        authDatabase: config.get<string>('application.db.authBase') as string,
        databaseName: config.get<string>('application.db.name') as string,
        host: config.get<string>('application.db.host') as string,
        password: config.get<string>('application.db.password') as string,
        port: config.get<string>('application.db.port') as string,
        username: config.get<string>('application.db.user') as string,
      }),
    }),
    inject: [ConfigService],
  };
}
