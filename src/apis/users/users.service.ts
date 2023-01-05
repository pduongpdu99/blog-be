import { Inject, Injectable } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { BaseService } from '../bases/base.service';
import { User } from '../entities.index';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService extends BaseService<
  CreateUserDto,
  UpdateUserDto,
  string
> {
  constructor(
    @Inject(PROVIDE_NAME.USER_REPOSITORY) private userRepository: typeof User,
  ) {
    super(userRepository);
  }
}
