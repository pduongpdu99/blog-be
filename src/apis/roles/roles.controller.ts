import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { BaseController } from '../bases/base.controller';

@Controller('roles')
export class RolesController extends BaseController {
  constructor(private readonly rolesService: RolesService) {
    super(rolesService);
  }
}
