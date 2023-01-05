import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import PROVIDE_NAME from 'src/common/provide-name';
import { Role } from '../entities.index';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    { provide: PROVIDE_NAME.ROLE_REPOSITORY, useValue: Role },
  ],
})
export class RolesModule {}
