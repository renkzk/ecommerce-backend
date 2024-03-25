import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { UserResponseType } from 'src/types/user.type';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<UserResponseType[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.buildUserResponse(user));
  }

  async get(id: number): Promise<UserResponseType> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.buildUserResponse(user);
  }

  async create(user: User): Promise<UserResponseType> {
    // Transactions help ensure that a series of operations are either all completed successfully or rolled back in case of any failure.
    return this.prisma.$transaction(async (prismaTransaction) => {
      // Check if the user already exists by username or email
      const existingUser = await prismaTransaction.user.findFirst({
        where: {
          OR: [{ username: user.username }, { email: user.email }],
        },
      });
      if (existingUser) {
        throw new ConflictException('Username or email already exists');
      }
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const userWithHashedPassword = { ...user, password: hashedPassword };

      //TODO: Add other checks here (e.g., email format validation)

      // Create the user in the database
      await prismaTransaction.user.create({ data: userWithHashedPassword });

      return this.buildUserResponse(userWithHashedPassword);
    });
  }

  async update(id: number, user: User): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  buildUserResponse(user: User): UserResponseType {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
