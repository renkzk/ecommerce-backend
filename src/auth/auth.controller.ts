import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { LoginDto } from './dto/auth.dto';
import { LoginResponse } from 'src/types/auth.type';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginCredentials: LoginDto): Promise<LoginResponse> {
    // identifier can be email or username
    const user = await this.authService.verifyCredentials(loginCredentials);
    const token = await this.authService.signUser(user);
    return { user, token };
  }

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<string> {
    const newUser = await this.userService.create(user);
    const token = await this.authService.signUser(newUser);
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async protected(@Request() req) {
    return 'Your jwt is valid!';
  }
}
