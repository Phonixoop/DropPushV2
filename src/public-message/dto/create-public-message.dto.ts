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
import { Project } from '../../project/entities/project.entity';

export class CreatePublicMessageInput {
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
  @MinLength(3)
  @MaxLength(255)
  platformType?: string;

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
