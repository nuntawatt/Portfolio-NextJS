import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { OAuthUser } from '../types/auth-type';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor() {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
            scope: ['user:email'],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
    ): Promise<OAuthUser> {
        console.log('GitHub profile:', profile);
        console.log('GitHub tokens:', _accessToken, _refreshToken);
        return {
            email: profile.emails?.[0]?.value || null,
            username: profile.username,
            provider: 'github',
            providerId: profile.id,
        };
    }
}