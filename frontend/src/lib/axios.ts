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

    // Only show toast for network errors and 500 errors
    // Let individual services/hooks handle their own error messages
    if (error.request && !error.response) {
      // Request was made but no response received
      toast.error('Network error. Please check your connection.');
    } else if (error.response?.status === 500) {
      // Only show toast for server errors
      toast.error('Server error. Please try again later.');
    }
    // For 400, 403, 404, etc., let the service layer handle the error message

    throw error;
  }
);

export default apiClient;
