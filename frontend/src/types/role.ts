export interface RoleResponse {
  id: string;
  name: string;
  description: string;
}

export interface RoleRequest {
  name: string;
  description?: string;
}

export interface RoleSearchParams {
  name?: string;
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'ASC' | 'DESC';
}
