import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository } from '@project/shared/core';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenModel } from './refresh-token.model';
import { Token } from '@project/shared/shared-types';

@Injectable()
export class RefreshTokenRepository extends BaseMongoRepository<
  RefreshTokenEntity,
  RefreshTokenModel
> {
  constructor(
    @InjectModel(RefreshTokenModel.name)
    private readonly refreshTokenModel: Model<RefreshTokenModel>
  ) {
    super(refreshTokenModel, RefreshTokenEntity.fromObject);
  }

  public async create(item: RefreshTokenEntity): Promise<Token> {
    return new this.refreshTokenModel(item).save();
  }

  public async deleteByTokenId(tokenId: string) {
    return this.refreshTokenModel.deleteOne({ tokenId }).exec();
  }

  public async findByTokenId(tokenId: string): Promise<Token | null> {
    return this.refreshTokenModel.findOne({ tokenId }).exec();
  }

  public async deleteExpiredTokens() {
    return this.refreshTokenModel.deleteMany({
      expiresIn: { $lt: new Date() },
    });
  }
}
