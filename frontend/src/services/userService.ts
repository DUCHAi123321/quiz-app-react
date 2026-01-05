import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/types/auth';
import type { PageResponse, PaginationParams } from '@/types/common';
import type { UserRequest, UserResponse } from '@/types/user';

export const getAllUsers = async (params?: PaginationParams): Promise<PageResponse<UserResponse>> => {
  const response = await apiClient.get<ApiResponse<PageResponse<UserResponse>>>('/users', { params });
  return response.data.data;
};

export const getUserById = async (id: string): Promise<UserResponse> => {
  const response = await apiClient.get<ApiResponse<UserResponse>>(`/users/${id}`);
  return response.data.data;
};

export const createUser = async (data: UserRequest): Promise<UserResponse> => {
  const response = await apiClient.post<ApiResponse<UserResponse>>('/users', data);
  return response.data.data;
};

export const updateUser = async (id: string, data: UserRequest): Promise<UserResponse> => {
  const response = await apiClient.put<ApiResponse<UserResponse>>(`/users/${id}`, data);
  return response.data.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};
