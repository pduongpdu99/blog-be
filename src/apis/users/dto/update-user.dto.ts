import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsOptional()
  roleId: number = 0;

  @IsNumber()
  @IsOptional()
  categoryId: number;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  middlename: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  hash: string;

  @IsString()
  @IsOptional()
  bio: string;
}
