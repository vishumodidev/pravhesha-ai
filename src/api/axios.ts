import axios from 'axios';
import { setupInterceptors } from './interceptors';

// Create base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Apply interceptors
setupInterceptors(api);

export default api;
