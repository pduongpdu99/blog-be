import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { BaseDto } from 'src/common/dto';

export class RoleDto extends BaseDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;
}
