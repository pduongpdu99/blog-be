import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { HttpResponse } from '../bases/base.exception';
import { BaseService } from '../bases/base.service';
import { User } from '../entities.index';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { v4 as uuidv4 } from 'uuid';
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

  /**
   * create data based on dto
   * @param dto
   * @returns
   */
  async create(dto: CreateUserDto, fieldForCheckExists?: any) {
    const data = await this.repository.findOne({
      where: { ...fieldForCheckExists },
    });
    if (data)
      throw new HttpResponse(
        'Cannot create record when it exist',
        HttpStatus.CONFLICT,
      );

    if (!dto.id) dto.id = uuidv4();

    return new HttpResponse(
      'Getting all record successfully',
      HttpStatus.CREATED,
      await this.repository.create(dto),
    );
  }
}
