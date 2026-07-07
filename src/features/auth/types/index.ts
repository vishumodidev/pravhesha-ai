export type Role = 'Admin' | 'Team Lead' | 'Support Manager' | 'Support Agent' | 'Sales Executive' | 'Marketing Executive' | 'ADMIN' | 'USER';

export type Permission = string;

export interface AuthUser {
  id: string | number;
  name: string;
  email: string;
  role: Role;
  department?: string;
  avatar?: string;
  permissions?: Permission[];
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
}

// Backward compatibility interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  avatar: string;
  permissions?: Permission[];
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
