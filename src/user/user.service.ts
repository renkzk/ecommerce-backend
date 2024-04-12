import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { ErrorCode } from 'src/shared/enums/error-code.enum';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    const foundUsers = await this.prisma.user.findMany();
    return foundUsers;
  }

  async get(id: number): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException(ErrorCode.UserNotFound);
    }
    return foundUser;
  }

  async create(body: Prisma.UserCreateInput): Promise<User> {
    // Transactions help ensure that a series of operations are either all completed successfully or rolled back in case of any failure.
    return await this.prisma.$transaction(async (prismaTransaction) => {
      // Check if the user already exists by username or email
      const foundUser = await prismaTransaction.user.findFirst({
        where: {
          OR: [{ username: body.username }, { email: body.email }],
        },
      });
      if (foundUser) {
        throw new ConflictException(ErrorCode.UserAlreadyExists);
      }
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const userWithHashedPassword = { ...body, password: hashedPassword };

      // Create the user in the database
      const newUser = await prismaTransaction.user.create({ data: userWithHashedPassword });

      // Return the created user
      return newUser;
    });
  }

  async update(id: number, body: Prisma.UserUpdateInput): Promise<User> {
    // Check if the user exists
    const foundUser = await this.prisma.user.findFirst({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException(ErrorCode.UserNotFound);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: body,
    });
    return updatedUser;
  }

  async delete(id: number): Promise<User> {
    const foundUser = await this.prisma.user.delete({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException(ErrorCode.UserNotFound);
    }
    return foundUser;
  }
}
