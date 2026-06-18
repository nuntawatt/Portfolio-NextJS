import { create } from 'zustand';
import { AuthUser } from '../core/types';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  setAuth: (user) => set({ 
    user, 
    isAuthenticated: true 
  }),
  
  logout: () => set({ 
    user: null, 
    isAuthenticated: false 
  }),
}));
