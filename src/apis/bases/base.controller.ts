import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BaseService } from './base.service';

@Controller('users')
export class UsersController<DtoTemplate> {
  constructor(private readonly baseService: BaseService<DtoTemplate>) {}

  @Post()
  create(@Body() createUserDto: DtoTemplate) {
    return this.baseService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.baseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: DtoTemplate) {
    return this.baseService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseService.remove(id);
  }
}
