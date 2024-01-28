import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileUploaderModule } from './file-uploader/file-uploader.module';
// ? not correct import. why?
import {
  FileVaultConfigModule,
  getMongooseOptions,
} from 'shared/config/file-vault/src';

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
