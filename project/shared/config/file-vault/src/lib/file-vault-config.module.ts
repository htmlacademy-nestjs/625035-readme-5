import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import fileVaultConfig from './file-vault.config';

const ENV_FILE_PATH = 'apps/file-vault/file-vault.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: ENV_FILE_PATH,
      isGlobal: true,
      load: [fileVaultConfig],
    }),
  ],
})
export class FileVaultConfigModule {}
