import {
  IsNotEmpty,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePublicApiInput {
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
}
