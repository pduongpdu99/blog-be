import { IsNumber, IsOptional } from '@nestjs/class-validator';
import { BaseDto } from 'src/common/dto';

export class PostCategoryDto extends BaseDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  postId: number;
}
