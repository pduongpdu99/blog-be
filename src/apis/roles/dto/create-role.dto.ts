import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { BaseDto } from 'src/common/dto';

export class CreateRoleDto extends BaseDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;
}
