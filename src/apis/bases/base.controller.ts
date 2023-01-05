import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseService } from './base.service';

export class BaseController<T> {
  constructor(private readonly baseService: BaseService<any, any, any>) {}

  @Post()
  create(@Body() createUserDto: any) {
    return this.baseService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.baseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.baseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: any, @Body() updateUserDto: any) {
    return this.baseService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.baseService.remove(id);
  }
}
