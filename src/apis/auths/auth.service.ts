import { Injectable } from '@nestjs/common';
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
  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '60s' }),
    };
  }

  /**
   *
   * @param dto
   */
  async signup(dto: SignupDto) {
    const { email, password } = dto;
    const saltround = 10;
    const salt = bcrypt.genSaltSync(saltround);
    const hash = bcrypt.hashSync(password, salt);

    delete dto.password;
    const params: CreateUserDto = { ...dto, hash };

    // create user
    const userCreated = await this.usersService.create(params);
    const payload = { email, id: userCreated.id };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    const needUpdate: UpdateUserDto = {
      refreshToken,
      expireIns: 24 * 60 * 60,
    };

    return await this.usersService.update(userCreated.id, needUpdate);
  }
}
