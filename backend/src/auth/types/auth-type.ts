export type OAuthUser = {
    email: string | null;
    firstName?: string;
    lastName?: string;
    username?: string;
    provider: 'google' | 'github' | 'facebook';
    providerId: string;
};

export type JwtPayload = {
    userId: number;
    email: string;
};