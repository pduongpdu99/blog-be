import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
   * @return
   */
  async create(dto: CreateDtoTemplate, fieldForCheckExists?: any) {
    // validate field FK id
    if (
      !(fieldForCheckExists == undefined || fieldForCheckExists == null) &&
      Object.keys(fieldForCheckExists).length > 0
    ) {
      for (const key of Object.keys(fieldForCheckExists)) {
        const isIdKeyValid = key.match(/^[a-zA-Z0-9]+Id$/g);
        const isString = typeof fieldForCheckExists[key] === 'string';
        const isStringValid = fieldForCheckExists[key].match(/^\w+$/g);
        const isNumber = typeof fieldForCheckExists[key] === 'number';
        const isNumberValid = fieldForCheckExists[key].match(/^\d+$/g);
        if (!(isIdKeyValid && isString && isStringValid))
          throw new HttpException(
            'It is not string invalid',
            HttpStatus.BAD_REQUEST,
          );

        if (!(isIdKeyValid && isNumber && isNumberValid))
          throw new HttpException(
            'It is not number invalid',
            HttpStatus.BAD_REQUEST,
          );
      }
      const data = await this.repository.findOne({
        where: { ...fieldForCheckExists },
      });
      if (data)
        throw new HttpException(
          'Cannot create record when it exist',
          HttpStatus.CONFLICT,
        );
    }

    return new HttpResponse(
      'Getting all record successfully',
      HttpStatus.CREATED,
      await this.repository.create(dto),
    );
  }

  /**
   * find all
   * @return
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
   * @return
   */
  async findOne(id: T) {
    if (typeof id === 'string' && !id.match(/^[a-zA-Z0-9]{1,}$/g)) {
      throw new HttpException('id is not valid string', HttpStatus.BAD_REQUEST);
    }

    if (typeof id === 'number' && !id.toString().match(/^\d+$/g)) {
      throw new HttpException('id is not valid number', HttpStatus.BAD_REQUEST);
    }

    const response = await this.repository.findOne({
      where: { id },
    });

    if (!response) {
      throw new HttpException('It is not exist', HttpStatus.BAD_REQUEST);
    }
    return new HttpResponse('Get user by id', HttpStatus.OK, response);
  }

  /**
   * update by id
   * @param id
   * @param dto
   * @return
   */
  async update(id: T, dto: UpdateDtoTemplate) {
    if (typeof id === 'string' && !id.match(/^[a-zA-Z0-9]{1,}$/g)) {
      throw new HttpException('id is not valid string', HttpStatus.BAD_REQUEST);
    }

    if (typeof id === 'number' && !id.toString().match(/^\d+$/g)) {
      throw new HttpException('id is not valid number', HttpStatus.BAD_REQUEST);
    }

    const check = await this.repository.findOne({
      where: { id },
    });

    if (!check) {
      throw new HttpException('user is not existed', HttpStatus.BAD_REQUEST);
    }

    const response = await this.repository.update(dto, {
      where: { id },
    });

    return new HttpResponse('Get user by id', HttpStatus.OK, response);
  }

  /**
   * remove by id
   * @param id
   * @return
   */
  async remove(id: T) {
    const data = await this.repository.findOne({ where: { id } });
    if (data == null || data == undefined)
      throw new HttpException(
        'Cannot remove record when it not exist',
        HttpStatus.BAD_REQUEST,
      );

    await this.repository.destroy({ where: { id } });
    return new HttpResponse('Delete successfully', HttpStatus.OK);
  }
}
