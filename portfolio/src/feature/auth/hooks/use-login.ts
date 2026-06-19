'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { AuthService, getErrorMessage } from '../core/lib';
import { SignInData } from '../core/types';
import { useAuthStore } from '../stores/store';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const setAuth = useAuthStore((state) => state.setAuth);

  const login = async (data: SignInData, onSuccess?: () => void) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.login(data);
      // We still update local store if needed for legacy reasons, 
      // but NextAuth handles the primary session now.
      setAuth(response.user);
      
      const result = await signIn('credentials', {
        redirect: false,
        token: response.user.token,
        id: response.user.id,
        email: response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        avatar: response.user.avatar,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      onSuccess?.();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => setError(null);

  return { login, isLoading, error, resetError };
};
