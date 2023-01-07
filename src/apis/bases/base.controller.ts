import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseService } from './base.service';

export class BaseController {
  constructor(private readonly baseService: BaseService<any, any, any>) {}

  @Post()
  create(@Body() createUserDto: any) {
    try {
      return this.baseService.create(createUserDto);
    } catch (error: any) {
      return error;
    }
  }

  @Get()
  findAll() {
    try {
      return this.baseService.findAll();
    } catch (error: any) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    try {
      return this.baseService.findOne(id);
    } catch (error: any) {
      return error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: any, @Body() updateUserDto: any) {
    try {
      return this.baseService.update(id, updateUserDto);
    } catch (error: any) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    try {
      return this.baseService.remove(id);
    } catch (error: any) {
      return error;
    }
  }
}
