import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponseEntity implements User {
  id: number;
  username: string;
  email: string;

  @Exclude()
  password: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserResponseEntity>) {
    Object.assign(this, partial);
  }
}
