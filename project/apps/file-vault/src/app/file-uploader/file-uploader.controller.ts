import 'multer';

import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '@project/shared/core';
import { fillDto } from '@project/shared/helpers';

import { FileUploaderService } from './file-uploader.service';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { FILE_INFO, MAX_FILE_SIZE } from './file-uploader.constant';

@ApiTags('File Uploader')
@Controller('files')
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: MAX_FILE_SIZE,
          message: FILE_INFO.MAX_SIZE,
        }),
      ],
    })
  )
  public async uploadFile(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @Get(':id')
  public async getFile(@Param('id', MongoIdValidationPipe) id: string) {
    const existFile = await this.fileUploaderService.getFile(id);
    return fillDto(UploadedFileRdo, existFile);
  }

  @Post('/upload-info')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFileInfo(
    @Body()
    file: Express.Multer.File
  ) {
    const fileEntity = await this.fileUploaderService.saveFile({
      ...file,
      buffer: Buffer.from(`${file.buffer}`, 'hex'),
    });

    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }
}
