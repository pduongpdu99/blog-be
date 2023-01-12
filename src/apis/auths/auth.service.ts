import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../users/dto/sign-up.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

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
    const user = (await this.usersService.getUserByEmail(email)).dataValues;
    const check = bcrypt.compareSync(password, user.hash);

    try {
      const expireIns = user.expireIns;
      if (!expireIns) {
        throw new HttpException('Account expired', HttpStatus.BAD_REQUEST);
      }

      const expi = new Date(expireIns);
      const curr = new Date();
      if (curr.getTime() >= expi.getTime()) {
        throw new HttpException('Account expired', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      return err;
    }

    if (!user || !check) {
      return false;
    }

    delete user.hash;
    return new HttpException(
      'Authentication successfully',
      HttpStatus.OK,
      user,
    );
  }

  /**
   * login
   * @param user
   * @returns
   */
  async login(user: { email: string; password: string }) {
    const result = await this.authentication(user.email, user.password);
    const { email, id } = result.options;
    if (!(200 <= result.status && result.status < 300)) {
      throw new HttpException(result.message, result.status);
    }

    if (email && id) {
      const payload = { email, id };
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: process.env.ACCESS_EXPIRE_INS,
        secret: process.env.PRIVATE_KEY,
      });
      return { accessToken };
    }
    return null;
  }

  /**
   *
   * @param dto
   */
  async signup(dto: SignupDto) {
    const { email, password } = dto;
    const resByEmail = await this.usersService.findAll({ email });
    if (resByEmail.data && resByEmail.data.length > 0) {
      throw new HttpException(
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
      throw new HttpException('Data cannot create', HttpStatus.BAD_REQUEST);
    }

    const payload = { email, id: userCreated.id };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    const needUpdate: UpdateUserDto = {
      refreshToken,
      expireIns: new Date(new Date().getTime() + 24 * 3600).toISOString(),
    };

    this.usersService.update(userCreated.id, needUpdate);
    return {
      ...params,
      refreshToken,
    };
  }
}
