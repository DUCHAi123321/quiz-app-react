import React, { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import { authService } from '@/services/authService';
import type { LoginRequest, RegisterRequest, User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = !!user && !!localStorage.getItem('accessToken');

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
      await authService.register(data);
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
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsLoading(false);
    }
  };

  /**
   * Check if user has specific role
   */
  const hasRole = (role: string): boolean => {
    if (!user) return false;
    return user.roles.includes(role);
  };

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = (roles: string[]): boolean => {
    if (!user) return false;
    return roles.some(role => user.roles.includes(role));
  };

  // Memoize context value to prevent unnecessary re-renders
  const value: AuthContextType = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      login,
      register,
      logout,
      hasRole,
      hasAnyRole,
    }),
    [user, isLoading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use Auth Context
 * Must be used within AuthProvider
 */
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
