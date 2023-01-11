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
   * @return
   */
  async create(dto: CreateDtoTemplate, fieldForCheckExists?: any) {
    try {
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
            throw new HttpResponse(
              'It is not string invalid',
              HttpStatus.BAD_REQUEST,
            );

          if (!(isIdKeyValid && isNumber && isNumberValid))
            throw new HttpResponse(
              'It is not number invalid',
              HttpStatus.BAD_REQUEST,
            );
        }
      }

      const data = (await this.findAll(fieldForCheckExists)).data;
      if (data && data.length > 0)
        throw new HttpResponse(
          'Cannot create record when it exist',
          HttpStatus.CONFLICT,
        );

      return new HttpResponse(
        'Create record successfully',
        HttpStatus.CREATED,
        data,
      );
    } catch (error: any) {
      return error;
    }
  }

  /**
   * find all
   * @return
   */
  async findAll(queries?: any) {
    try {
      let where: any = { deletedDate: { [Op.eq]: null } };
      if (queries) {
        const q: any = {};
        Object.keys(queries).forEach((key) => {
          q[key] = { [Op.eq]: queries[key] };
        });
        where = { ...where, ...q };
      }
      return new HttpResponse(
        'Create record successfully',
        HttpStatus.CREATED,
        await this.repository.findAll({ where }),
      );
    } catch (error: any) {
      return error;
    }
  }

  /**
   * find one by id
   * @param id
   * @return
   */
  async findOne(id: T) {
    try {
      if (
        typeof id === 'string' &&
        !id.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/g,
        )
      ) {
        throw new HttpResponse(
          'id is not valid string',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (typeof id === 'number' && !id.toString().match(/^\d+$/g)) {
        throw new HttpResponse(
          'id is not valid number',
          HttpStatus.BAD_REQUEST,
        );
      }

      const response = await this.repository.findOne({
        where: { id },
      });

      return new HttpResponse('Get user by id', HttpStatus.OK, response);
    } catch (error: any) {
      return error;
    }
  }

  /**
   * update by id
   * @param id
   * @param dto
   * @return
   */
  async update(id: T, dto: UpdateDtoTemplate) {
    try {
      if (
        typeof id === 'string' &&
        !id.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/g,
        )
      ) {
        throw new HttpResponse(
          'id is not valid string',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (typeof id === 'number' && !id.toString().match(/^\d+$/g)) {
        throw new HttpResponse(
          'id is not valid number',
          HttpStatus.BAD_REQUEST,
        );
      }

      const check = await this.repository.findOne({ where: { id } });

      if (!check) {
        throw new HttpResponse('user is not existed', HttpStatus.BAD_REQUEST);
      }

      await this.repository.update(dto, { where: { id } });

      return new HttpResponse(
        'Update user by id successfully',
        HttpStatus.OK,
        (await this.findOne(id)).data,
      );
    } catch (error: any) {
      return error;
    }
  }

  /**
   * remove by id
   * @param id
   * @return
   */
  async remove(id: T) {
    try {
      const data = await this.repository.findOne({ where: { id } });
      if (data == null || data == undefined)
        throw new HttpResponse(
          'Cannot remove record when it not exist',
          HttpStatus.BAD_REQUEST,
        );
      await this.repository.destroy({ where: { id } });
      return new HttpResponse('Delete successfully', HttpStatus.OK);
    } catch (error: any) {
      return error;
    }
  }
}
