import { Entity } from '@project/shared/core';
import { Like } from '@project/shared/shared-types';

export class LikeEntity implements Like, Entity<string, Like> {
  public id?: string;
  public publicationId?: string;
  public userId: string;

  constructor(data: Like) {
    this.populate(data);
  }

  public populate(data: Like): void {
    this.id = data.id;
    this.publicationId = data.publicationId;
    this.userId = data.userId;
  }

  public toPOJO(): Like {
    return {
      id: this.id,
      publicationId: this.publicationId,
      userId: this.userId,
    };
  }

  static fromObject(data: Like): LikeEntity {
    return new LikeEntity(data);
  }
}
