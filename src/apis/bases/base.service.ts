import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

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
    console.log(id);
    if (typeof id === 'string' && !id.match(/^(a-zA-Z0-9){1,}$/g)) {
      throw new HttpException('id is not valid string', HttpStatus.BAD_REQUEST);
    }

    if (typeof id === 'number' && !id.toString().match(/^\d+$/g)) {
      throw new HttpException('id is not valid number', HttpStatus.BAD_REQUEST);
    }

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
