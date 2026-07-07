import { create } from 'zustand';
import type { AuthUser, Role, Permission } from '../types';
import { getToken, removeToken, removeRefreshToken } from '../utils/token';

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  role: Role | null;
  permissions: Permission[];
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, accessToken: string, refreshToken?: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const initialToken = getToken();

  return {
    accessToken: initialToken,
    user: null,
    role: null,
    permissions: [],
    isAuthenticated: !!initialToken,
    setAuth: (user, accessToken, _refreshToken) => {
      set({
        accessToken,
        user,
        role: user.role,
        permissions: user.permissions || [],
        isAuthenticated: true,
      });
    },
    clearAuth: () => {
      removeToken();
      removeRefreshToken();
      set({
        accessToken: null,
        user: null,
        role: null,
        permissions: [],
        isAuthenticated: false,
      });
    },
  };
});
