import { IUser } from 'src/db/db/db.types';
import { UserWithoutPassword } from '../types/user.interface';

export const getUserWithoutPassword = (user: IUser): UserWithoutPassword => ({
  id: user.id,
  createdAt: user.createdAt,
  login: user.login,
  updatedAt: user.updatedAt,
  version: user.version,
});
