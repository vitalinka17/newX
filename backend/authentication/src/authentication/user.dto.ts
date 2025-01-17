import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class ValidateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
