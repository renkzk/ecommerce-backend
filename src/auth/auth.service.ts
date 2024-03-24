import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(username: string, password: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        username,
        password,
      },
    });
  }
}
