import { Exclude, Transform } from 'class-transformer';

export class UserEntity {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update

  @Transform((param) => Number(param.value))
  createdAt: string; // timestamp of creation

  @Transform((param) => Number(param.value))
  updatedAt: string; // timestamp of last update

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
