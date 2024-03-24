import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.model';
import { LocalAuthGuard } from './auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() { username, password }: { username: string; password: string }): Promise<User> {
    return this.authService.validateUser(username, password);
  }
}
