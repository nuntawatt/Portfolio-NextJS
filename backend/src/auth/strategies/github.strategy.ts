import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuthUser } from '../types/auth-type';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    const clientId = configService.get<string>('oauth.github.clientId');
    const clientSecret = configService.get<string>('oauth.github.clientSecret');
    const callbackURL = configService.get<string>('oauth.github.callbackUrl');

    super({
      clientID: clientId || 'dummy-github-client-id',
      clientSecret: clientSecret || 'dummy-github-client-secret',
      callbackURL:
        callbackURL || 'http://localhost:3001/api/auth/github/callback',
      scope: ['user:email'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): OAuthUser {
    return {
      email: profile.emails?.[0]?.value ?? null,
      username: profile.username ?? '',
      firstName: profile.displayName ?? profile.username ?? '',
      avatar: profile.photos?.[0]?.value ?? null,
      provider: 'github',
      providerId: profile.id,
      accessToken,
      refreshToken,
    };
  }
}
