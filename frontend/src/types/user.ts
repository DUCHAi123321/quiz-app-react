export const RoleEnum = {
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_USER: 'ROLE_USER',
} as const;

export type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum];

export interface RoleResponse {
  id: string;
  name: RoleEnum;
  description: string;
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string | null;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  active: boolean;
  roles: RoleResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  phoneNumber?: string;
  password?: string;
  dateOfBirth?: string;
  active?: boolean;
  roleIds?: string[];
}
