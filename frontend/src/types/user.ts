export enum RoleEnum {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
}

export interface RoleResponse {
  id: string;
  name: RoleEnum;
  description: string;
}

export interface UserResponse {
  id: string;
  email: string;
  fullName: string;
  active: boolean;
  roles: RoleResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface UserRequest {
  email: string;
  password: string;
  fullName: string;
  roleIds?: string[];
}
