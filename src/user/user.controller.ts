import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserResponseEntity } from './entities/user.entity';
import { plainToClass } from 'class-transformer';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // About "@Api"
  // @Api is a decorator from "@nestjs/swagger" library,
  // it allows us to customize the response for an endpoint so that we can see it in Swagger UI Documentation

  // About "ParseIntPipe"
  // ParseIntPipe automatically converts the incoming parameter to an integer type

  // About "plainToClass"
  // When we return a "User" object in the response
  // we need to use "plainToClass" with "UserResponseEntity" class-transformer,
  // this removes the "password" field from the response.

  @Get()
  @ApiOperation({ summary: 'Get all Users' })
  @ApiOkResponse({ type: [UserResponseEntity] })
  async getAll(): Promise<UserResponseEntity[]> {
    const users = await this.userService.getAll();
    return users.map((user) => plainToClass(UserResponseEntity, user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single User by ID' })
  @ApiOkResponse({ type: UserResponseEntity })
  async get(@Param('id', ParseIntPipe) id: number): Promise<UserResponseEntity> {
    const user = await this.userService.get(id);
    return plainToClass(UserResponseEntity, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create a single User' })
  @ApiCreatedResponse({ type: UserResponseEntity })
  async create(@Body() body: CreateUserDto): Promise<UserResponseEntity> {
    const createdUser = await this.userService.create(body);
    return plainToClass(UserResponseEntity, createdUser);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a single User by ID' })
  @ApiOkResponse({ type: UserResponseEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto): Promise<UserResponseEntity> {
    const updatedUser = await this.userService.update(id, body);
    return plainToClass(UserResponseEntity, updatedUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a single User by ID' })
  @ApiOkResponse({ type: UserResponseEntity })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<UserResponseEntity> {
    const deletedUser = await this.userService.delete(id);
    return plainToClass(UserResponseEntity, deletedUser);
  }
}
