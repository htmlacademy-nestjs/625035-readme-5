import 'multer';
import { Express } from 'express';
import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MongoIdValidationPipe } from '@project/shared/core';

import { FileUploaderService } from './file-uploader.service';
import { fillDto } from '@project/shared/helpers';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';

@Controller('files')
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @Get(':id')
  public async getFile(@Param('id', MongoIdValidationPipe) id: string) {
    const existFile = await this.fileUploaderService.getFile(id);
    return fillDto(UploadedFileRdo, existFile);
  }
}
