import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/shared/core';
import { FileEntity } from './file-uploader.entity';
import { FileModel } from './file-uploader.model';

@Injectable()
export class FileRepository extends BaseMongoRepository<FileEntity, FileModel> {
  constructor(@InjectModel(FileModel.name) fileModel: Model<FileModel>) {
    super(fileModel, FileEntity.fromObject);
  }
}
