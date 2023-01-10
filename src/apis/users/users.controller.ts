import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { HttpResponse } from '../bases/base.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const fieldForCheckExists = { email: createUserDto.email };
      const data = await this.usersService.findAll(fieldForCheckExists);
      if (data && data.length > 0)
        throw new HttpResponse(
          'Cannot create record when it exist',
          HttpStatus.CONFLICT,
        );

      return new HttpResponse(
        'Getting all record successfully',
        HttpStatus.CREATED,
        await this.usersService.create(createUserDto),
      );
    } catch (error) {
      return new HttpResponse(error.message, error.code);
    }
  }
}
