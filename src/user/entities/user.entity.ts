import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

// This class is used to transform the user data in the response.
// It excludes sensitive information like password from the response.
// Must be used with the "plainToClass" function.
// Example of use: "plainToClass(UserResponseEntity, user);"

export class UserResponseEntity implements User {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly role: Role;

  @Exclude()
  readonly password: string;

  @Exclude()
  readonly createdAt: Date;

  @Exclude()
  readonly updatedAt: Date;
}
