import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

import { AuthUser } from '@project/shared/shared-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop()
  public avatar: string;

  @Prop({
    unique: true,
    required: true,
  })
  public email: string;

  @Prop({ required: true })
  public firstname: string;

  @Prop({ required: true })
  public lastname: string;

  @Prop({ required: true })
  public passwordHash: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
