import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  FileVaultConfigModule,
  getMongooseOptions,
} from '@project/shared/config/file-vault';
import { FileUploaderModule } from './file-uploader/file-uploader.module';

@Module({
  imports: [
    FileUploaderModule,
    FileVaultConfigModule,
    // todo: something broken here?
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
