import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLoginDTO } from './dto/create-login.dto';
import { UserService } from '../user/user.service';
import { createHash } from 'node:crypto';
import { PrismaService } from 'src/db/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshDTO } from './dto/refresh.dto';
import { secret } from './auth.module';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async createUser(dto: CreateLoginDTO) {
    const newPassword = hashPassword(dto.password);
    const loginDTO = {
      login: dto.login,
      password: newPassword,
    };

    return await this.userService.create(loginDTO);
  }

  async login(dto: CreateLoginDTO) {
    const password = hashPassword(dto.password);

    const user = await this.prisma.user.findFirst({
      where: {
        login: dto.login,
        password,
      },
    });

    if (!user) {
      throw new HttpException('user not exist', HttpStatus.FORBIDDEN);
    }

    const payload = createLoginPayload(user.id, user.login);

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: secret,
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: secret,
      }),
    };
  }

  async refresh(refreshDTO: RefreshDTO) {
    return {
      refresh_token: refreshDTO.refreshToken,
    };
  }
}

export const hashPassword = (data) =>
  createHash('sha256').update(data).digest('hex');

const createLoginPayload = (userId, login) => ({
  userId,
  login,
});
