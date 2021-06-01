import {
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { SchemaTypes, Types, Document, Mongoose, Model } from 'mongoose';
export class LoginUserInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  public email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  public password!: string;
}
