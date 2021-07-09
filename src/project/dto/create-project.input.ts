import {
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { SchemaTypes, Types, Document, Mongoose, Model } from 'mongoose';
export class CreateProjectInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @Matches(/^[a-z][a-z0-9]*$/i)
  nickName!: string;

  // platform

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  platformType: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @Matches(/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i)
  appId: string;
}
