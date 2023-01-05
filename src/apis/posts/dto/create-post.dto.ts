import { IsNumber, IsOptional, IsString, IsEnum } from "@nestjs/class-validator";
import { PostStatus } from "../posts.enum";

export class CreatePostDto {
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
