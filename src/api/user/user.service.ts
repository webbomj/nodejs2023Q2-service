import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db/db.service';
import { IUser } from 'src/db/db/db.types';
import { v4 } from 'uuid';
import { getUserWithoutPassword } from './helpers/getUserWithoutPassword';
import { UserWithoutPassword } from './types/user.interface';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  create(createUserDto: CreateUserDto): UserWithoutPassword {
    const newUser: IUser = {
      id: v4(),
      login: createUserDto.login,
      password: createUserDto.password,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      version: 1,
    };

    this.db.users.push(newUser);

    return getUserWithoutPassword(newUser);
  }

  findAll() {
    return this.db.users.map((newUser) => getUserWithoutPassword(newUser));
  }

  findOne(id: string): UserWithoutPassword {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not exist', 404);
    }
    return getUserWithoutPassword(user);
  }

  update(id: string, updateUserDto: UpdateUserDto): UserWithoutPassword {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not exist', 404);
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Wrong current password', 403);
    }

    user.version += 1;
    user.updatedAt = new Date().getTime();
    user.password = updateUserDto.newPassword;

    return getUserWithoutPassword(user);
  }

  remove(id: string) {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not exist', 404);
    }

    this.db.users = this.db.users.filter((user) => user.id !== id);
    return;
  }
}
