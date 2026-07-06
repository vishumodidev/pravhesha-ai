import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Team Lead' | 'Support Manager' | 'Support Agent' | 'Sales Executive' | 'Marketing Executive';
  department: string;
  avatar: string;
  permissions?: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  setAuth: (user: User | null, token: string | null) => void;
  setAuthLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  authLoading: false,
  setAuth: (user, token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ user, token, isAuthenticated: !!token });
  },
  setAuthLoading: (loading) => set({ authLoading: loading }),
  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
