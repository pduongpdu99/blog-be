import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateTagDto {
  @IsNumber()
  @IsOptional()
  parentId?: number;

  @IsString()
  title: string;
}
