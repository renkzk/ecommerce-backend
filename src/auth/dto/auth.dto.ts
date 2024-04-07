import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginCredentialsDto {
  @ApiProperty({
    description: 'email or username of the User',
  })
  @IsNotEmpty()
  identifier: string; // can be email or username

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
