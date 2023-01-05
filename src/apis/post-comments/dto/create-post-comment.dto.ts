import { IsString, IsOptional } from '@nestjs/class-validator';
import { BaseDto } from 'src/common/dto';

export class CreatePostCommentDto extends BaseDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  postId: string;

  @IsString()
  parentId: string;

  @IsString()
  content: string;
}
