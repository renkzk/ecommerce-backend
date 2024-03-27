import { User } from '@prisma/client';

export type UserResponseType = Omit<User, 'password'>;
