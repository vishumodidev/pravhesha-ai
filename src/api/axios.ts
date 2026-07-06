import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

// Create base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refreshing and errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Check if unauthorized and request hasn't been retried yet
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Placeholders for token refresh mechanism
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          // In a real app, make a request to refresh endpoint:
          // const res = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { refreshToken });
          // const { token, newRefreshToken } = res.data;
          // localStorage.setItem('token', token);
          // localStorage.setItem('refreshToken', newRefreshToken);
          
          // Mock token refresh:
          const mockNewToken = 'mock-refreshed-jwt-token-' + Date.now();
          localStorage.setItem('token', mockNewToken);
          
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${mockNewToken}`;
          }
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token failed, clear storage and redirect/logout
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Global error logger/handler
    const errorMessage = (error.response?.data as { message?: string })?.message || error.message || 'An unexpected error occurred';
    console.error('[API Error]:', errorMessage);
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
