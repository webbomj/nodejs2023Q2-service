import { IUser } from 'src/db/db/db.types';

export type UserWithoutPassword = Omit<IUser, 'password'>;
