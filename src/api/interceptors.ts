import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';

export const setupInterceptors = (api: AxiosInstance): AxiosInstance => {
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
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            // Mock token refresh:
            const mockNewToken = 'mock-refreshed-jwt-token-' + Date.now();
            localStorage.setItem('token', mockNewToken);
            
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${mockNewToken}`;
            }
            return api(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      
      const errorMessage = (error.response?.data as { message?: string })?.message || error.message || 'An unexpected error occurred';
      console.error('[API Error]:', errorMessage);
      
      return Promise.reject(new Error(errorMessage));
    }
  );

  return api;
};
