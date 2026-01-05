import { useState } from 'react';
import toast from 'react-hot-toast';
import * as userService from '@/services/userService';
import type { PageResponse, PaginationParams } from '@/types/common';
import type { UserRequest, UserResponse } from '@/types/user';

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<PageResponse<UserResponse> | null>(null);
  const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);

  const fetchUsers = async (params?: PaginationParams) => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers(params);
      setUsers(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id: string) => {
    try {
      setLoading(true);
      const data = await userService.getUserById(id);
      setCurrentUser(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      toast.error('Failed to load user details');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data: UserRequest) => {
    try {
      setLoading(true);
      const newUser = await userService.createUser(data);
      toast.success('User created successfully');
      return newUser;
    } catch (error) {
      console.error('Failed to create user:', error);
      toast.error('Failed to create user');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, data: UserRequest) => {
    try {
      setLoading(true);
      const updatedUser = await userService.updateUser(id, data);
      toast.success('User updated successfully');
      return updatedUser;
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error('Failed to update user');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setLoading(true);
      await userService.deleteUser(id);
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    users,
    currentUser,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
  };
};
