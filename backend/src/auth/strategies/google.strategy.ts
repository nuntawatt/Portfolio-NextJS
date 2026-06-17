import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuthUser } from '../types/auth-type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    const clientId = configService.get<string>('oauth.google.clientId');
    const clientSecret = configService.get<string>('oauth.google.clientSecret');
    const callbackURL = configService.get<string>('oauth.google.callbackUrl');

    super({
      clientID: clientId || 'dummy-google-client-id',
      clientSecret: clientSecret || 'dummy-google-client-secret',
      callbackURL:
        callbackURL || 'http://localhost:3001/api/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): OAuthUser {
    return {
      email: profile.emails?.[0].value ?? null,
      firstName: profile.name?.givenName ?? '',
      lastName: profile.name?.familyName ?? '',
      avatar: profile.photos?.[0].value ?? null,
      provider: 'google',
      providerId: profile.id,
      accessToken,
      refreshToken,
    };
  }
}
