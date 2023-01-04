import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { BaseDto } from 'src/common/dto';
import { PostStatus } from '../posts.enum';

export class PostDto extends BaseDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  authorId: string;

  @IsNumber()
  tagId: number;

  @IsNumber()
  categoryId: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content: string;

  @IsEnum(PostStatus)
  status: PostStatus = PostStatus.PENDING;
}
