import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document, Mongoose, Model } from 'mongoose';

import { Env } from 'src/environments/environment';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Project } from 'src/project/entities/project.entity';

@Schema({ timestamps: true })
export class PublicMessage extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  iconUrl!: string;

  @Prop({ required: true })
  message!: string;

  @Prop({ required: true, default: 'android' })
  platformType!: string;

  @Prop({ required: false })
  expireDate?: Date;

  @Prop({ required: true, unique: true, index: true })
  messageId!: string;

  @Prop({ type: Types.ObjectId, required: false, ref: 'vipusers' })
  VipUser!: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}
export const PublicMessageEntitySchema =
  SchemaFactory.createForClass(PublicMessage);
