import { HttpStatus, Inject, Injectable } from '@nestjs/common';
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
      throw new HttpResponse(
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
    const response = await this.repository.findAll();
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
      throw new HttpResponse('id is not valid string', HttpStatus.BAD_REQUEST);
    }

    if (typeof id === 'number' && !id.toString().match(/^\d+$/g)) {
      throw new HttpResponse('id is not valid number', HttpStatus.BAD_REQUEST);
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
    const response = await this.repository.update(dto, {
      where: { id },
    });
    return new HttpResponse('Get user by id', HttpStatus.ACCEPTED, response);
  }

  /**
   * remove by id
   * @param id
   * @returns
   */
  async remove(id: T) {
    const data = await this.repository.findOne({ where: { id } });
    if (!data)
      throw new HttpResponse(
        'Cannot update record when it not exist',
        HttpStatus.BAD_REQUEST,
      );
    this.repository.update({ where: { deletedDate: new Date().getTime() } });

    return new HttpResponse('Delete successfully', HttpStatus.ACCEPTED);
  }
}
