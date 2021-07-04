import {
  IsNotEmpty,
  IsOptional,
  IsString,
  isURL,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidateBy,
} from 'class-validator';
import { Types } from 'mongoose';
import { Project } from '../../project/entities/project.entity';

export class CreateMessageInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @IsUrl({}, { message: 'icon url must be an URL address' })
  iconUrl!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  message!: string;

  @IsNotEmpty()
  @IsString()
  projectId!: string;

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

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  messageId?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  expireDate?: Date;
}
