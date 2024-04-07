import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginCredentialsDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async verifyCredentials(loginCredentials: LoginCredentialsDto): Promise<User> {
    let user: User;
    const { identifier, password } = loginCredentials;

    // identifier can be an email or a username
    if (identifier.includes('@')) {
      // In case the identifier is an email
      user = await this.prisma.user.findUnique({
        where: {
          email: identifier,
        },
      });
    } else {
      // In case the identifier is a username
      user = await this.prisma.user.findUnique({
        where: {
          username: identifier,
        },
      });
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Compare the provided password with the hashed password stored in the database using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    } else throw new UnauthorizedException('Invalid Password');
  }
}
