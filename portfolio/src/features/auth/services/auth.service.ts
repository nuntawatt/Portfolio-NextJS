import { authApi } from '../api/auth.api';
import { SignInData, SignUpData, AuthResponse } from '../types/auth.type';
import { setAuthToken, removeAuthToken } from '../utils/auth.util';

export class AuthService {
  static async login(data: SignInData): Promise<AuthResponse> {
    const response = await authApi.login(data);
    setAuthToken(response.user.token);
    return response;
  }

  static async register(data: SignUpData): Promise<AuthResponse> {
    const response = await authApi.register(data);
    setAuthToken(response.user.token);
    return response;
  }

  static logout(): void {
    removeAuthToken();
  }
}
