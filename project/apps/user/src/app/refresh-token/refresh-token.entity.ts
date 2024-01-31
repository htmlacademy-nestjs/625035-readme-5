import { Entity } from '@project/shared/core';
import { Token } from '@project/shared/shared-types';

export class RefreshTokenEntity implements Entity<string>, Token {
  public id: string;
  public tokenId: string;
  public userId: string;
  public createdAt: Date;
  public expiresIn: Date;
  [key: string]: unknown;

  constructor(data: Token) {
    this.populate(data);
  }

  static fromObject(data: Token): RefreshTokenEntity {
    return new RefreshTokenEntity(data);
  }

  public toPOJO() {
    return {
      createdAt: this.createdAt,
      expiresIn: this.expiresIn,
      id: this.id,
      tokenId: this.tokenId,
      userId: this.userId,
    };
  }

  public populate(data: Token) {
    this.createdAt = data.createdAt;
    this.expiresIn = data.expiresIn;
    this.id = data.id;
    this.tokenId = data.tokenId;
    this.userId = data.userId;
  }
}
