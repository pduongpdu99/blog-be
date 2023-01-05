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
    return 'This action adds a new user';
  }

  /**
   * find all
   * @returns
   */
  async findAll() {
    const response = await this.repository.findAll();
    return response;
  }

  /**
   * find one by id
   * @param id
   * @returns
   */
  async findOne(id: T) {
    return `This action returns a #${id} user`;
  }

  /**
   * update by id
   * @param id
   * @param updateUserDto
   * @returns
   */
  async update(id: T, updateUserDto: UpdateDtoTemplate) {
    return `This action updates a #${id} user`;
  }

  /**
   * remove by id
   * @param id
   * @returns
   */
  async remove(id: T) {
    return `This action removes a #${id} user`;
  }
}
