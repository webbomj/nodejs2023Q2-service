import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db/db.service';
import { IDBUser } from 'src/db/db/db.types';
import { PrismaService } from 'src/db/db/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private db: DbService,
    private prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IDBUser> {
    // const newUser: IUser = {
    //   id: v4(),
    //   login: createUserDto.login,
    //   password: createUserDto.password,
    //   createdAt: new Date().getTime(),
    //   updatedAt: new Date().getTime(),
    //   version: 1,
    // };

    // await this.prisma.user.create({
    //   data: {
    //     login: createUserDto.login,
    //     password: createUserDto.password,
    //     createdAt: new Date().getTime(),
    //     updatedAt: new Date().getTime(),
    //     version: 1,
    //   },
    // });
    // this.db.users.push(newUser);

    // return newUser;

    const user = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
        createdAt: new Date().getTime().toString(),
        updatedAt: new Date().getTime().toString(),
        version: 1,
      },
    });

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany({});
  }

  async findOne(id: string): Promise<IDBUser> {
    // const user = this.db.users.find((user) => user.id === id);
    // if (!user) {
    //   throw new HttpException('User not exist', 404);
    // }

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not exist', 404);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IDBUser> {
    // const user = this.db.users.find((user) => user.id === id);
    // if (!user) {
    //   throw new HttpException('User not exist', 404);
    // }

    // if (user.password !== updateUserDto.oldPassword) {
    //   throw new HttpException('Wrong current password', 403);
    // }

    // user.version += 1;
    // user.updatedAt = new Date().getTime();
    // user.password = updateUserDto.newPassword;

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not exist', 404);
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Wrong current password', 403);
    }

    const updateAt = new Date().getTime().toString();

    const newUser = await this.prisma.user.update({
      where: {
        id,
        password: updateUserDto.oldPassword,
      },
      data: {
        password: updateUserDto.newPassword,
        version: {
          increment: 1,
        },

        updatedAt: updateAt,
      },
    });

    return newUser;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not exist', 404);
    }

    await this.prisma.user.delete({
      where: {
        id,
      },
    });
    // const user = this.db.users.find((user) => user.id === id);
    // if (!user) {
    //   throw new HttpException('User not exist', 404);
    // }

    // this.db.users = this.db.users.filter((user) => user.id !== id);
    return;
  }
}
