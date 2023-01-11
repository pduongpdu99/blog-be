import {
  Controller,
  Post,
  Body,
  Get,
  Headers,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    return await this.authService.login(body);
  }

  @Post('auth/signup')
  async signup(@Body() params: SignupDto) {
    return await this.authService.signup(params);
  }

  @Get('test')
  async test(@Headers() headers: any) {
    const accessToken = headers.authorization;
    return await this.jwtService.verify(accessToken, {
      publicKey: process.env.PUBLIC_KEY,
    });
  }
}
