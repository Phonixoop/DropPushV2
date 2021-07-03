import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document, Mongoose, Model } from 'mongoose';

import { Env } from '../../environments/environment';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Platform } from '../../platform/entities/platform.entity';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true, unique: false, ref: 'User' })
  user!: Types.ObjectId;

  @Prop({ required: true, unique: false })
  nickName!: string;

  @Prop({ required: true, unique: true })
  deviceToken!: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const ProjectEntitySchema = SchemaFactory.createForClass(Project);
