import { IsNumber, IsOptional } from '@nestjs/class-validator';
import { BaseDto } from 'src/common/dto';

export class PostTagDto extends BaseDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  tagId: number;

  @IsNumber()
  postId: number;
}
