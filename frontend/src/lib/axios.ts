import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple refresh token calls
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Handle token refresh logic
const handleTokenRefresh = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await axios.post(
    `${apiClient.defaults.baseURL}/auth/refresh`,
    { refreshToken }
  );

  const { accessToken, refreshToken: newRefreshToken } = response.data.data;

  // Update tokens
  localStorage.setItem('accessToken', accessToken);
  if (newRefreshToken) {
    localStorage.setItem('refreshToken', newRefreshToken);
  }

  return accessToken;
};

// Clear auth data and redirect to login
const clearAuthAndRedirect = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  
  if (globalThis.location.pathname !== '/auth/login') {
    globalThis.location.href = '/auth/login';
  }
};

// Handle different HTTP error status codes
const handleErrorStatus = (status: number, message?: string) => {
  switch (status) {
    case 400:
      toast.error(message || 'Bad request. Please check your input.');
      break;
    case 401:
      toast.error('Unauthorized. Please login again.');
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
      toast.error(message || 'An error occurred. Please try again.');
  }
};

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

// Response interceptor - Handle errors globally and refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized - Try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch(err => {
            throw err;
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const accessToken = await handleTokenRefresh();
        
        // Update authorization header
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Process queued requests
        processQueue(null, accessToken);
        isRefreshing = false;

        // Retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, logout user
        processQueue(refreshError as Error, null);
        isRefreshing = false;
        
        clearAuthAndRedirect();
        toast.error('Session expired. Please login again.');
        
        throw refreshError;
      }
    }

    // Handle other error status codes
    if (error.response) {
      const { status } = error.response;
      const message = (error.response.data as { message?: string })?.message;
      handleErrorStatus(status, message);
    } else if (error.request) {
      // Request was made but no response received
      toast.error('Network error. Please check your connection.');
    } else {
      // Something else happened
      toast.error('An unexpected error occurred.');
    }

    throw error;
  }
);

export default apiClient;
