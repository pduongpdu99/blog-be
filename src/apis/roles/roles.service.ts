import { Inject, Injectable } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { BaseService } from '../bases/base.service';
import { Role } from '../entities.index';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService extends BaseService<
  CreateRoleDto,
  UpdateRoleDto,
  number
> {
  constructor(
    @Inject(PROVIDE_NAME.ROLE_REPOSITORY) private roleRepository: typeof Role,
  ) {
    super(roleRepository);
  }
}
