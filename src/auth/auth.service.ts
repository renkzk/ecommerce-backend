import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/user/user.model';
import * as bcrypt from 'bcrypt';
import { UserResponseType } from 'src/types/user.type';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async verifyCredentials(loginCredentials: LoginDto): Promise<UserResponseType> {
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
      return this.userService.buildUserResponse(user);
    } else throw new UnauthorizedException('Invalid Password');
  }

  async signUser(user: UserResponseType): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<object> {
    return this.jwtService.verify(token);
  }
}
