import { ApiProperty } from '@nestjs/swagger';
import { UserResponseEntity } from 'src/user/entities/user.entity';

export class LoginResponseEntity {
  @ApiProperty()
  readonly user: UserResponseEntity;

  @ApiProperty()
  readonly token: string;
}
