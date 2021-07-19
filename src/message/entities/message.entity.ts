import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document, Mongoose, Model } from 'mongoose';

import { Env } from 'src/environments/environment';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Project } from 'src/project/entities/project.entity';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  iconUrl!: string;

  @Prop({ required: true })
  message!: string;

  // @Prop({ type: Types.ObjectId, required: true, ref: 'projects' })
  // project!: Types.ObjectId;

  @Prop({ required: true, default: 'android' })
  platformType!: string;

  @Prop({ required: true, unique: true, index: true })
  appId!: string;

  @Prop({ required: false })
  expireDate?: Date;

  @Prop({ required: true, unique: true, index: true })
  messageId!: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}
export const MessageEntitySchema = SchemaFactory.createForClass(Message);
