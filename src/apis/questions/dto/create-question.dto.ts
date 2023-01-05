import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateQuestionDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  describe: string;
}
