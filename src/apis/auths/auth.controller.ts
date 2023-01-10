import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { HttpResponse } from '../bases/base.exception';
import { SignupDto } from '../users/dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signup(@Body() params: SignupDto) {
    const user = this.authService.signup(params);

    return new HttpResponse('Sign up successfully', HttpStatus.OK, user);
  }
}
