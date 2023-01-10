import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { HttpResponse } from './base.exception';
import { BaseService } from './base.service';

export class BaseController {
  constructor(private readonly baseService: BaseService<any, any, any>) {}

  @Post()
  async create(@Body() createUserDto: any) {
    return await this.baseService.create(createUserDto, {});
  }

  @Get()
  async findAll() {
    return await this.baseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: any) {
    return await this.baseService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: any, @Body() updateUserDto: any) {
    return await this.baseService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: any) {
    return await this.baseService.remove(id);
  }
}
