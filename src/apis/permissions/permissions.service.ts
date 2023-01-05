import { Inject, Injectable } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { BaseService } from '../bases/base.service';
import { Permission } from '../entities.index';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService extends BaseService<
  CreatePermissionDto,
  UpdatePermissionDto,
  number
> {
  constructor(
    @Inject(PROVIDE_NAME.PERMISSION_REPOSITORY)
    permissionRepository: typeof Permission,
  ) {
    super(permissionRepository);
  }
}
