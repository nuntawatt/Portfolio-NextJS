'use client';

import { useState } from 'react';
import { AuthService } from '../services/auth.service';
import { SignInData } from '../types/auth.type';
import { getErrorMessage } from '../utils/auth.util';
import { useAuthStore } from '../store/auth.store';

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
