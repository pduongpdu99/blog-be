import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HttpResponse } from './base.exception';
import { BaseService } from './base.service';

export class BaseController {
  constructor(private readonly baseService: BaseService<any, any, any>) {}

  @Post()
  create(@Body() createUserDto: any) {
    try {
      return this.baseService.create(createUserDto);
    } catch (error: any) {
      return new HttpResponse(error.message, error.status);
    }
  }

  @Get()
  findAll() {
    try {
      return this.baseService.findAll();
    } catch (error: any) {
      return new HttpResponse(error.message, error.status);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    try {
      return this.baseService.findOne(id);
    } catch (error: any) {
      return new HttpResponse(error.message, error.status);
    }
  }

  @Patch(':id')
  update(@Param('id') id: any, @Body() updateUserDto: any) {
    try {
      return this.baseService.update(id, updateUserDto);
    } catch (error: any) {
      return new HttpResponse(error.message, error.status);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    try {
      return this.baseService.remove(id);
    } catch (error: any) {
      return new HttpResponse(error.message, error.status);
    }
  }
}
