import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import PROVIDE_NAME from 'src/common/provide-name';
import { Permission } from '../entities.index';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    JwtService,
    { provide: PROVIDE_NAME.PERMISSION_REPOSITORY, useValue: Permission },
  ],
})
export class PermissionsModule {}
