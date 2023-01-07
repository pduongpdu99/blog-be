import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { HttpResponse } from './base.exception';

@Injectable()
export class BaseService<CreateDtoTemplate, UpdateDtoTemplate, T> {
  repository: any;
  constructor(@Inject('SEQUELIZE_MODELS') private repo: any) {
    this.repository = repo;
  }

  /**
   * create data based on dto
   * @param dto
   * @returns
   */
  async create(dto: CreateDtoTemplate, fieldForCheckExists?: any) {
    const data = await this.repository.findOne({
      where: { ...fieldForCheckExists },
    });
    if (data)
      return new HttpResponse(
        'Cannot create record when it exist',
        HttpStatus.CONFLICT,
      );

    return new HttpResponse(
      'Getting all record successfully',
      HttpStatus.CREATED,
      await this.repository.create(dto),
    );
  }

  /**
   * find all
   * @returns
   */
  async findAll() {
    const response = await this.repository.findAll({
      where: { deletedDate: { [Op.ne]: null } },
    });

    return new HttpResponse(
      'Getting all record successfully',
      HttpStatus.OK,
      response,
    );
  }

  /**
   * find one by id
   * @param id
   * @returns
   */
  async findOne(id: T) {
    if (typeof id === 'string' && !id.match(/^[a-zA-Z0-9]{1,}$/g)) {
      return new HttpResponse('id is not valid string', HttpStatus.BAD_REQUEST);
    }

    if (typeof id === 'number' && !id.toString().match(/^\d+$/g)) {
      return new HttpResponse('id is not valid number', HttpStatus.BAD_REQUEST);
    }

    const response = await this.repository.findOne({
      where: { id },
    });
    return new HttpResponse('Get user by id', HttpStatus.OK, response);
  }

  /**
   * update by id
   * @param id
   * @param dto
   * @returns
   */
  async update(id: T, dto: UpdateDtoTemplate) {
    if (typeof id === 'string' && !id.match(/^[a-zA-Z0-9]{1,}$/g)) {
      return new HttpResponse('id is not valid string', HttpStatus.BAD_REQUEST);
    }

    if (typeof id === 'number' && !id.toString().match(/^\d+$/g)) {
      return new HttpResponse('id is not valid number', HttpStatus.BAD_REQUEST);
    }

    const check = await this.repository.findOne({
      where: { id },
    });

    if (!check) {
      return new HttpResponse('user is not existed', HttpStatus.BAD_REQUEST);
    }

    const response = await this.repository.update(dto, {
      where: { id },
    });

    return new HttpResponse('Get user by id', HttpStatus.OK, response);
  }

  /**
   * remove by id
   * @param id
   * @returns
   */
  async remove(id: T) {
    const data = await this.repository.findOne({ where: { id } });
    if (data == null || data == undefined)
      return new HttpResponse(
        'Cannot remove record when it not exist',
        HttpStatus.BAD_REQUEST,
      );

    await this.repository.destroy({ where: { id } });
    return new HttpResponse('Delete successfully', HttpStatus.OK);
  }
}
