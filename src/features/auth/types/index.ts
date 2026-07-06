export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Team Lead' | 'Support Manager' | 'Support Agent' | 'Sales Executive' | 'Marketing Executive';
  department: string;
  avatar: string;
  permissions?: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
