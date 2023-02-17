import { IsString, IsEmail } from '@nestjs/class-validator';

export class SignupDto {
  @IsString()
  firstname: string;

  @IsString()
  middlename?: string;

  @IsString()
  lastname: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
