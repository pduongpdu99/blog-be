import { Inject, Injectable } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { BaseService } from '../bases/base.service';
import { User } from '../entities.index';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService extends BaseService<UserDto> {
  constructor(
    @Inject(PROVIDE_NAME.USER_REPOSITORY) private userRepository: typeof User,
  ) {
    super(userRepository);
  }
}
