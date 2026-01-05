export interface RoleResponse {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export interface RoleRequest {
  name: string;
  description?: string;
  active?: boolean;
}

export interface RoleSearchParams {
  name?: string;
  active?: boolean;
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'ASC' | 'DESC';
}
