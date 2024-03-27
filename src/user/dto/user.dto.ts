import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  readonly username: string;
  @IsOptional()
  readonly password: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
