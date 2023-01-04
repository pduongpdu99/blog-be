import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { BaseDto } from 'src/common/dto';

export class CategoryDto extends BaseDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  parentId: number;

  @IsString()
  title: string;
}
