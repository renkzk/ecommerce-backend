import { User } from 'src/user/user.model';

export type UserResponseType = Omit<User, 'password'>;
