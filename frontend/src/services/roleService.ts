import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/types/auth';
import type { PageResponse, PaginationParams } from '@/types/common';
import type { RoleRequest, RoleResponse, RoleSearchParams } from '@/types/role';

export const getAllRoles = async (params?: PaginationParams): Promise<PageResponse<RoleResponse>> => {
  console.log('[roleService] Calling GET /roles with params:', params);
  const response = await apiClient.get<ApiResponse<PageResponse<RoleResponse>>>('/roles', { params });
  console.log('[roleService] Response:', response.data);
  return response.data.data;
};

export const searchRoles = async (params: RoleSearchParams): Promise<PageResponse<RoleResponse>> => {
  const response = await apiClient.get<ApiResponse<PageResponse<RoleResponse>>>('/roles/search', { params });
  return response.data.data;
};

export const getRoleById = async (id: string): Promise<RoleResponse> => {
  const response = await apiClient.get<ApiResponse<RoleResponse>>(`/roles/${id}`);
  return response.data.data;
};

export const createRole = async (data: RoleRequest): Promise<RoleResponse> => {
  const response = await apiClient.post<ApiResponse<RoleResponse>>('/roles', data);
  return response.data.data;
};

export const updateRole = async (id: string, data: RoleRequest): Promise<RoleResponse> => {
  const response = await apiClient.put<ApiResponse<RoleResponse>>(`/roles/${id}`, data);
  return response.data.data;
};

export const deleteRole = async (id: string): Promise<void> => {
  await apiClient.delete(`/roles/${id}`);
};
