import { Entity } from '@project/shared/core';
import { File } from '@project/shared/shared-types';

export class FileEntity implements File, Entity<string> {
  public createdAt?: Date;
  public hashName: string;
  public id?: string;
  public mimetype: string;
  public originalName: string;
  public path: string;
  public size: number;
  public subDirectory: string;
  public updatedAt?: Date;

  public toPOJO() {
    return {
      createdAt: this.createdAt,
      hashName: this.hashName,
      id: this.id,
      mimetype: this.mimetype,
      originalName: this.originalName,
      path: this.path,
      size: this.size,
      subDirectory: this.subDirectory,
      updatedAt: this.updatedAt,
    };
  }

  public populate(data: File): FileEntity {
    this.createdAt = data.createdAt;
    this.hashName = data.hashName;
    this.id = data.id;
    this.mimetype = data.mimetype;
    this.originalName = data.originalName;
    this.path = data.path;
    this.size = data.size;
    this.subDirectory = data.subDirectory;
    this.updatedAt = data.updatedAt;

    return this;
  }

  static fromObject(data: File): FileEntity {
    return new FileEntity().populate(data);
  }
}
