import { IsDateString, IsOptional } from '@nestjs/class-validator';
export class BaseDto {
  @IsDateString()
  @IsOptional()
  createdDate?: string;

  @IsDateString()
  @IsOptional()
  updatedDate?: string;

  @IsDateString()
  @IsOptional()
  deletedDate?: string;

  @IsDateString()
  @IsOptional()
  createdBy?: string;

  @IsDateString()
  @IsOptional()
  updatedBy?: string;

  @IsDateString()
  @IsOptional()
  deletedBy?: string;
}
