import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/auth.guard';
import { BaseService } from './base.service';

export class BaseController {
  constructor(private readonly baseService: BaseService<any, any, any>) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createUserDto: any) {
    return await this.baseService.create(createUserDto, {});
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.baseService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: any) {
    return await this.baseService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: any, @Body() updateUserDto: any) {
    return await this.baseService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: any) {
    return await this.baseService.remove(id);
  }
}
