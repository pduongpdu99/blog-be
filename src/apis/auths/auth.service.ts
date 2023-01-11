import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../users/dto/sign-up.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { HttpResponse } from '../bases/base.exception';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  /**
   * authentication
   * @param email
   * @param password
   * @returns
   */
  async authentication(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    const check = bcrypt.compareSync(password, user.hash);

    if (!user || !check) {
      return false;
    }

    delete user.hash;
    return user;
  }

  /**
   * login
   * @param user
   * @returns
   */
  async login(user: { email: string; password: string }) {
    const result = await this.authentication(user.email, user.password);
    if (result) {
      const payload = { email: user.email, id: result.id };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '60s' });
      return new HttpResponse('Login successfully', HttpStatus.OK, {
        accessToken,
      });
    }
    return new HttpResponse('Login failded', HttpStatus.BAD_REQUEST, result);
  }

  /**
   *
   * @param dto
   */
  async signup(dto: SignupDto) {
    const { email, password } = dto;
    const resByEmail = await this.usersService.findAll({ email });
    if (resByEmail.data && resByEmail.data.length > 0) {
      throw new HttpResponse(
        'Cannot create this account cause email existed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltround = 10;
    const salt = bcrypt.genSaltSync(saltround);
    const hash = bcrypt.hashSync(password, salt);

    delete dto.password;
    const params: CreateUserDto = { ...dto, hash };

    // create user
    const response = await this.usersService.create(params);
    const userCreated = response.data;
    if (!userCreated) {
      throw new HttpResponse('Data cannot create', HttpStatus.BAD_REQUEST);
    }

    const payload = { email, id: userCreated.id };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    const needUpdate: UpdateUserDto = {
      refreshToken,
      expireIns: new Date(new Date().getTime() + 24 * 3600).toISOString(),
    };

    this.usersService.update(userCreated.id, needUpdate);
    return new HttpResponse('User created', HttpStatus.OK, {
      ...params,
      refreshToken,
    });
  }
}
