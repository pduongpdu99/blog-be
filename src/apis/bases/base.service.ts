import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BaseService<CreateDtoTemplate, UpdateDtoTemplate, T> {
  repository: any;
  constructor(@Inject('SEQUELIZE_MODELS') private repo: any) {
    this.repository = repo;
  }

  /**
   * create data based on dto
   * @param createUserDto
   * @returns
   */
  async create(createUserDto: CreateDtoTemplate) {
    return await this.repository.create(createUserDto);
  }

  /**
   * find all
   * @returns
   */
  async findAll() {
    return await this.repository.findAll();
  }

  /**
   * find one by id
   * @param id
   * @returns
   */
  async findOne(id: T) {
    return await this.repository.findOne({
      where: { id },
    });
  }

  /**
   * update by id
   * @param id
   * @param updateUserDto
   * @returns
   */
  async update(id: T, updateUserDto: UpdateDtoTemplate) {
    return await this.repository.update(updateUserDto, {
      where: { id },
    });
  }

  /**
   * remove by id
   * @param id
   * @returns
   */
  async remove(id: T) {
    return await this.repository.destroy({ where: { id } });
  }
}
