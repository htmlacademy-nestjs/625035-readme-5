import { Entity } from '@project/shared/core';
import { Tag } from '@project/shared/shared-types';
import { CreateTagDto } from './dto/create-tag.dto';

export class TagEntity implements Tag, Entity<string, Tag> {
  public id?: string;
  public publicationId?: string;
  public value: string;

  public populate(data: Tag): TagEntity {
    this.id = data.id;
    this.publicationId = data.publicationId;
    this.value = data.value;

    return this;
  }

  public toPOJO(): Tag {
    return {
      id: this.id,
      publicationId: this.publicationId,
      value: this.value,
    };
  }

  static fromObject(data: Tag): TagEntity {
    return new TagEntity().populate(data);
  }

  static fromDto(dto: CreateTagDto, publicationId: string): TagEntity {
    return new TagEntity().populate({
      ...dto,
      publicationId,
    });
  }
}
