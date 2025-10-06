import type { User } from './user';

export type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'passwordHash'> & {
  password: string;
};

export type UpdateUserDto = Pick<User, 'id'> & Partial<Omit<User, 'passwordHash' | 'createdAt'>>;
