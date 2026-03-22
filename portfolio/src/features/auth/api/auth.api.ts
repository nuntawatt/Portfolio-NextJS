import { SignInData, SignUpData, AuthResponse } from '../types/auth.type';
import { AUTH_MOCK_DELAY } from '../constants/auth.constant';

export const authApi = {
  login: async (data: SignInData): Promise<AuthResponse> => {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, AUTH_MOCK_DELAY));
    
    if (data.email === 'error@example.com') {
      throw new Error('Invalid email or password');
    }
    
    return {
      user: { 
        id: 'user-1', 
        email: data.email, 
        token: 'mock-jwt-token-123' 
      },
      message: 'Successfully logged in',
    };
  },

  register: async (data: SignUpData): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, AUTH_MOCK_DELAY));
    
    if (data.email === 'error@example.com') {
      throw new Error('Email is already taken');
    }

    return {
      user: { 
        id: 'user-2', 
        email: data.email, 
        firstName: data.firstName, 
        lastName: data.lastName, 
        token: 'mock-jwt-token-456' 
      },
      message: 'Account created successfully',
    };
  }
};
