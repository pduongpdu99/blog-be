import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { BaseDto } from "src/common/dto";

export class CreateCommentDto extends BaseDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  userId: string;

  @IsNumber()
  questionId: number;

  @IsNumber()
  parentId: number;

  @IsString()
  content: string;
}
