import { Controller } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { BaseController } from '../bases/base.controller';

@Controller('permissions')
export class PermissionsController extends BaseController {
  constructor(private readonly permissionsService: PermissionsService) {
    super(permissionsService);
  }
}
