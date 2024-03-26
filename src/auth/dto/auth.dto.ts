import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  identifier: string; // can be email or username

  @IsNotEmpty()
  password: string;
}
