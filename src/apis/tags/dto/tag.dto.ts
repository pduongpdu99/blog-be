import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { BaseDto } from 'src/common/dto';

export class TagDto extends BaseDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsOptional()
  parentId?: number;

  @IsString()
  title: string;
}
