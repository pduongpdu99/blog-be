import { IsString } from '@nestjs/class-validator';

export class SignupDto {
  @IsString()
  firstname: string;

  @IsString()
  middlename?: string;

  @IsString()
  lastname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
