'use client';

import { useState } from 'react';
import { AuthService } from '../services/auth.service';
import { SignUpData } from '../types/auth.type';
import { getErrorMessage } from '../utils/auth.util';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: SignUpData, onSuccess?: () => void) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await AuthService.register(data);
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
