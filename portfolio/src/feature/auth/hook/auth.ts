'use client';

import { useAuthStore } from '../store/store';

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return { 
    user, 
    isAuthenticated, 
    logout 
  };
};
