import { Controller, Post, Body, Logger } from '@nestjs/common';
import { SignupDto } from '../users/dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  logger = new Logger();
  constructor(private authService: AuthService) {}

  //   @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body: any) {
    this.logger.log('Đăng nhập');
    return await this.authService.login(body);
  }

  @Post('auth/signup')
  async signup(@Body() params: SignupDto) {
    this.logger.log('Đăng ký');
    return await this.authService.signup(params);
  }
}
