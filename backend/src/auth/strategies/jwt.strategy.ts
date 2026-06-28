import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccessTokenPayload } from '../types/auth-type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // JWT is already verified and active
  validate(payload: AccessTokenPayload) {
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      isEmailVerified: payload.isEmailVerified,
    };
  }
}
