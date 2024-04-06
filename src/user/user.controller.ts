import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseType } from 'src/types/user.type';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async getAll(): Promise<UserResponseType[]> {
    return this.UserService.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<UserResponseType> {
    //ParseIntPipe automatically converts the incoming parameter to an integer type
    return this.UserService.get(id);
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<UserResponseType> {
    return this.UserService.create(body);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto): Promise<UserResponseType> {
    return this.UserService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<UserResponseType> {
    return this.UserService.delete(Number(id));
  }
}
