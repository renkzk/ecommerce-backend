import { UserResponseType } from './user.type';

export interface LoginResponse {
  user: UserResponseType;
  token: string;
}
