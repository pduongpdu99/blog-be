import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { BaseDto } from 'src/common/dto';

export class CreateQuestionDto extends BaseDto {
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
