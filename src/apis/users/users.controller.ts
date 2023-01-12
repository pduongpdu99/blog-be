import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/auth.guard';
import { BaseController } from '../bases/base.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
