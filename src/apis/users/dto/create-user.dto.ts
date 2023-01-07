import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { BaseDto } from 'src/common/dto';

export class CreateUserDto extends BaseDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsNumber()
  roleId?: number = 0;

  @IsString()
  categoryIds: string | null = null;

  @IsString()
  firstname: string;

  @IsString()
  middlename?: string;

  @IsString()
  lastname: string;

  @IsString()
  email: string;

  @IsString()
  hash: string;

  @IsString()
  bio?: string;
}
