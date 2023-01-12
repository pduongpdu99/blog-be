import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import PROVIDE_NAME from 'src/common/provide-name';
import { User } from '../entities.index';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: PROVIDE_NAME.USER_REPOSITORY, useValue: User },
    JwtService,
  ],
})
export class UsersModule {}
