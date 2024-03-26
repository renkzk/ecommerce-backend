import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Checks if jwt token was created with the correct secret key
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: number; username: string }) {
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
