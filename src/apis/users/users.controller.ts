import { Controller, Post, Body } from '@nestjs/common';
import { BaseController } from '../bases/base.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
