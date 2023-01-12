import { Controller, Post, Body } from '@nestjs/common';
import { SignupDto } from '../users/dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body: any) {
    return await this.authService.login(body);
  }

  @Post('auth/signup')
  async signup(@Body() params: SignupDto) {
    return await this.authService.signup(params);
  }
}
