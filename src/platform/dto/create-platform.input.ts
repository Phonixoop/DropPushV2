import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { Project } from '../../project/entities/project.entity';

export class CreatePlatformInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  platformType!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @Matches(/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i)
  appId!: string;

  @IsNotEmpty()
  project!: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  user!: Types.ObjectId;
}
