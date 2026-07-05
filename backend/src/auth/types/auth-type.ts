export type OAuthUser = {
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  provider: 'google' | 'github';
  providerId: string;
  avatar?: string;
  accessToken?: string;
  refreshToken?: string;
};


export type AccessTokenPayload = {
  userId: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
};
