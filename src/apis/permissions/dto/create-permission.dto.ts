import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { BaseDto } from "src/common/dto";

export class CreatePermissionDto extends BaseDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  roleId: number;

  @IsString()
  apiPath: string;
}
