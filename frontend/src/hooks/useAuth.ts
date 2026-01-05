import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '@/services/authService';
import type { LoginRequest, RegisterRequest, User } from '@/types/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  /**
   * Login user
   */
  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      
      // Save tokens and user data
      localStorage.setItem('accessToken', response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
      toast.success('Login successful!');
      
      // Redirect based on user role
      if (response.user.roles.includes('ADMIN')) {
        navigate('/management');
      } else {
        navigate('/');
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user
   */
  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      toast.success(response.message || 'Registration successful! Please login.');
      navigate('/auth/login');
      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API fails
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = !!user && !!localStorage.getItem('accessToken');

  /**
   * Check if user has specific role
   */
  const hasRole = (role: string) => {
    return user?.roles.includes(role) || false;
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    hasRole,
  };
};
