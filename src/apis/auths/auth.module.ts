import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import PROVIDE_NAME from 'src/common/provide-name';
import { User } from '../entities.index';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '60s', algorithm: 'HS256' },
      privateKey: process.env.PRIVATE_KEY,
      publicKey: process.env.PUBLIC_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    { provide: PROVIDE_NAME.USER_REPOSITORY, useValue: User },
  ],
  exports: [AuthService],
})
export class AuthModule {}
