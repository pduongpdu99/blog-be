import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpResponse } from '../bases/base.exception';
import { SignupDto } from '../users/dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  //   @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body: any) {
    try {
      return await this.authService.login(body);
    } catch (err) {
      return err;
    }
  }

  @Post('auth/signup')
  async signup(@Body() params: SignupDto) {
    try {
      return await this.authService.signup(params);
    } catch (err) {
      return err;
    }
  }

  @Get('test')
  async test(@Headers() headers: any) {
    try {
      const accessToken = headers.access_token;
      return await this.jwtService.verify(accessToken, {
        publicKey: process.env.PUBLIC_KEY,
      });
    } catch (err) {
      return new HttpResponse(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
