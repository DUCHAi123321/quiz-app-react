import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle different error status codes
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as { message?: string };

      switch (status) {
        case 400:
          toast.error(data.message || 'Bad request. Please check your input.');
          break;
        case 401:
          toast.error('Unauthorized. Please login again.');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          // Redirect to login if needed
          if (window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login';
          }
          break;
        case 403:
          toast.error('Access denied. You do not have permission.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(data.message || 'An error occurred. Please try again.');
      }
    } else if (error.request) {
      // Request was made but no response received
      toast.error('Network error. Please check your connection.');
    } else {
      // Something else happened
      toast.error('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
