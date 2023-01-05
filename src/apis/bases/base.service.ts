import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BaseService<DtoTemplate> {
  repository: any;
  constructor(@Inject('SEQUELIZE_MODELS') private repo: any) {
    this.repository = repo;
  }

  /**
   * create data based on dto
   * @param createUserDto
   * @returns
   */
  async create(createUserDto: DtoTemplate) {
    return 'This action adds a new user';
  }

  /**
   * find all
   * @returns
   */
  async findAll() {
    console.log(this.repository);
    const response = await this.repository.findAll();
    return response;
  }

  /**
   * find one by id
   * @param id
   * @returns
   */
  async findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  /**
   * update by id
   * @param id
   * @param updateUserDto
   * @returns
   */
  async update(id: string, updateUserDto: DtoTemplate) {
    return `This action updates a #${id} user`;
  }

  /**
   * remove by id
   * @param id
   * @returns
   */
  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
