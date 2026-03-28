export type OAuthUser = {
    email?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    provider: 'google' | 'github' | 'facebook';
    providerId: string;
    avatar?: string;
    accessToken?: string;
    refreshToken?: string;
};

export type AccessTokenPayload = {
    userId: number;
    email: string;
    role: string;
    isEmailVerified: boolean;
};

export type JwtPayload = AccessTokenPayload;
