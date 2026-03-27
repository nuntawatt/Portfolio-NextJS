import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { OAuthUser } from '../types/auth-type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: Profile
    ): Promise<OAuthUser> {
        return {
            email: profile.emails?.[0].value || null,
            firstName: profile.name?.givenName || '',
            lastName: profile.name?.familyName || '',
            provider: 'google',
            providerId: profile.id,
        };
    }
}