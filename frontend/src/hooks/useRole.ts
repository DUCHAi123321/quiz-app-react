import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as roleService from '@/services/roleService';
import type { PageResponse, PaginationParams } from '@/types/common';
import type { RoleRequest, RoleResponse, RoleSearchParams } from '@/types/role';

export const useRole = () => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<PageResponse<RoleResponse> | null>(null);
  const [currentRole, setCurrentRole] = useState<RoleResponse | null>(null);

  const fetchRoles = useCallback(async (params?: PaginationParams) => {
    try {
      setLoading(true);
      const data = await roleService.getAllRoles(params);
      setRoles(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchRoles = useCallback(async (params: RoleSearchParams) => {
    try {
      setLoading(true);
      const data = await roleService.searchRoles(params);
      setRoles(data);
      return data;
    } catch (error) {
      console.error('Failed to search roles:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRoleById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await roleService.getRoleById(id);
      setCurrentRole(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch role:', error);
      toast.error('Failed to load role details');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createRole = useCallback(async (data: RoleRequest) => {
    try {
      setLoading(true);
      const newRole = await roleService.createRole(data);
      toast.success('Role created successfully');
      return newRole;
    } catch (error) {
      console.error('Failed to create role:', error);
      toast.error('Failed to create role');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRole = useCallback(async (id: string, data: RoleRequest) => {
    try {
      setLoading(true);
      const updatedRole = await roleService.updateRole(id, data);
      toast.success('Role updated successfully');
      return updatedRole;
    } catch (error) {
      console.error('Failed to update role:', error);
      toast.error('Failed to update role');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRole = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await roleService.deleteRole(id);
      toast.success('Role deleted successfully');
    } catch (error) {
      console.error('Failed to delete role:', error);
      toast.error('Failed to delete role');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    roles,
    currentRole,
    fetchRoles,
    searchRoles,
    fetchRoleById,
    createRole,
    updateRole,
    deleteRole,
  };
};
