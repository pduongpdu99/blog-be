import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
  async create(dto: CreateUserDto) {
    try {
      const fieldForCheckExists = { email: dto.email };
      const data = await this.userRepository.findAll({
        where: { ...fieldForCheckExists },
      });
      if (data && data.length > 0)
        throw new HttpResponse(
          'Cannot create record when it exist',
          HttpStatus.CONFLICT,
        );

      if (!dto.id) dto.id = uuidv4();
      dto.roleId = 0;
      dto.expireIns = 24 * 3600;

      return new HttpResponse(
        'Getting all record successfully',
        HttpStatus.CREATED,
        await this.userRepository.create<User>({ ...dto }),
      );
    } catch (error) {
      return error;
    }
  }

  /**
   * get user by email
   * @param email
   * @returns
   */
  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne<User>({
        where: { email },
      });

      if (!user) {
        throw new HttpException(
          'User with email `' + email + '` is not exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
    } catch (error) {
      return error;
    }
  }
}
