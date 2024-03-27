import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseType } from 'src/types/user.type';
import { CreateUserDto } from './dto/user.dto';
import { User } from '@prisma/client';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async getAll(): Promise<UserResponseType[]> {
    return this.UserService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<UserResponseType> {
    return this.UserService.get(Number(id));
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserResponseType> {
    return this.UserService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<UserResponseType> {
    return this.UserService.update(Number(id), user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.UserService.delete(Number(id));
  }
}
