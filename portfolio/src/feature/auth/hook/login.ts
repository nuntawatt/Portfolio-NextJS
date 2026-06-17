'use client';

import { useState } from 'react';
import { AuthService, getErrorMessage } from '../core/lib';
import { SignInData } from '../core/type';
import { useAuthStore } from '../store/store';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const setAuth = useAuthStore((state) => state.setAuth);

  const login = async (data: SignInData, onSuccess?: () => void) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.login(data);
      setAuth(response.user);
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
