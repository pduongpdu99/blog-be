import { IsString } from '@nestjs/class-validator';
import { BaseDto } from 'src/common/dto';

export class CreateRoleDto extends BaseDto {
  @IsString()
  name: string;
}
