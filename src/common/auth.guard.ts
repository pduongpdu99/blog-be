import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (request.headers.authorization) {
      this.jwtService.verify(request.headers.authorization.split(' ')[1], {
        secret: process.env.PRIVATE_KEY,
      });

      return true;
    }

    if (!(200 <= response.code && response.code < 300)) {
      return response.message;
    }

    return false;
  }
}
