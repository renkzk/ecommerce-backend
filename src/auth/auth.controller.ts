import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { LoginCredentialsDto } from './dto/auth.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseEntity } from './entities/auth.entity';
import { plainToClass } from 'class-transformer';
import { UserResponseEntity } from 'src/user/entities/user.entity';
import { Role } from '@prisma/client';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({ type: LoginResponseEntity })
  async login(@Body() body: LoginCredentialsDto): Promise<LoginResponseEntity> {
    // identifier can be email or username
    const verifiedUser = await this.authService.verifyCredentials(body);

    const payload = { username: verifiedUser.username, sub: verifiedUser.id };
    const token = await this.jwtService.sign(payload);

    const response = {
      user: plainToClass(UserResponseEntity, verifiedUser),
      token,
    };

    return plainToClass(LoginResponseEntity, response);
  }

  @Post('login/admin')
  @ApiOperation({ summary: 'Login user if admin' })
  @ApiOkResponse({ type: LoginResponseEntity })
  async loginAdmin(@Body() body: LoginCredentialsDto): Promise<LoginResponseEntity> {
    // identifier can be email or username
    const verifiedUser = await this.authService.verifyCredentials(body);

    if (verifiedUser.role !== Role.ADMIN) {
      throw new UnauthorizedException();
    }

    return this.login({ identifier: body.identifier, password: body.password });
  }

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiOkResponse({ type: LoginResponseEntity })
  async register(@Body() body: CreateUserDto): Promise<LoginResponseEntity> {
    await this.userService.create(body);

    return this.login({ identifier: body.email, password: body.password });
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async protected(@Request() req) {
    return 'Your jwt is valid!';
  }
}
