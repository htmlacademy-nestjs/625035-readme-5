import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Token } from '@project/shared/shared-types';

@Schema({
  collection: 'refresh-sessions',
  timestamps: true,
})
export class RefreshTokenModel extends Document implements Token {
  @Prop({
    required: true,
  })
  public tokenId: string;

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public expiresIn: Date;
}

export const RefreshTokenSchema =
  SchemaFactory.createForClass(RefreshTokenModel);
