'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { AuthService, getErrorMessage } from '../core/lib';
import { SignUpData } from '../core/type';
import { useAuthStore } from '../store/store';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const setAuth = useAuthStore((state) => state.setAuth);

  const register = async (data: SignUpData, onSuccess?: () => void) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.register(data);
      setAuth(response.user);
      
      const result = await signIn('credentials', {
        redirect: false,
        token: response.user.token,
        id: response.user.id,
        email: response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
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

  return { register, isLoading, error, resetError };
};
