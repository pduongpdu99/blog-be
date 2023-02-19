import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import PROVIDE_NAME from 'src/common/provide-name';
import { Role } from '../entities.index';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    JwtService,
    { provide: PROVIDE_NAME.ROLE_REPOSITORY, useValue: Role },
  ],
})
export class RolesModule {}
