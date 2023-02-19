import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { AuthGuard } from 'src/common/auth.guard';
import { BaseService } from './base.service';

export class BaseController {
  logger = new Logger();
  constructor(private readonly baseService: BaseService<any, any, any>) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createUserDto: any) {
    this.logger.log(`[${this.baseService.constructor.name}] create`);
    return await this.baseService.create(createUserDto, {});
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    this.logger.log(`[${this.baseService.constructor.name}] get all`);
    return await this.baseService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: any) {
    this.logger.log(`[${this.baseService.constructor.name}] find by id`);
    return await this.baseService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: any, @Body() updateUserDto: any) {
    this.logger.log(`[${this.baseService.constructor.name}] update by id`);
    return await this.baseService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: any) {
    this.logger.log(`[${this.baseService.constructor.name}] delete by id`);
    return await this.baseService.remove(id);
  }
}
