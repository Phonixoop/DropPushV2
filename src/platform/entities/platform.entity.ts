import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document, Mongoose, Model } from 'mongoose';

import { Env } from '../../environments/environment';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Type } from '@nestjs/common';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';

@Schema({ timestamps: true })
export class Platform extends Document {
  @Prop({ required: true, unique: true })
  appId!: string;

  @Prop({ required: true, unique: false })
  platformType!: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'users' })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, unique: true, ref: 'projects' })
  project: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const PlatformEntitySchema = SchemaFactory.createForClass(Platform);
