import { Entity } from '@project/shared/core';
import { Tag } from '@project/shared/shared-types';

export class TagEntity implements Tag, Entity<string, Tag> {
  public id?: string;
  public value: string;

  public populate(data: Tag): TagEntity {
    this.id = data.id;
    this.value = data.value;

    return this;
  }

  public toPOJO(): Tag {
    return {
      id: this.id,
      value: this.value,
    };
  }

  static fromObject(data: Tag): TagEntity {
    return new TagEntity().populate(data);
  }
}
