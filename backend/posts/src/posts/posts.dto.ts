import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsUrl,
  IsDateString,
  MaxLength,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  content: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  authorId: number;
}

export class PostResponseDto {
  @IsUUID()
  id: string;

  @IsNumber()
  postId: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  authorId: number;

  @IsDateString()
  createdAt: string;
}
