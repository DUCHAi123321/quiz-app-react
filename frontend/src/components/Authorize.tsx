import { type ReactNode } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';

interface AuthorizeProps {
  children: ReactNode;
  roles?: string | string[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

/**
 * Authorize component for Role-Based Access Control (RBAC)
 * Conditionally renders children based on user's roles
 * 
 * @param children - Content to render if user has required roles
 * @param roles - Single role or array of roles required
 * @param requireAll - If true, user must have all roles. If false, user must have at least one role (default: false)
 * @param fallback - Optional content to render if user doesn't have required roles
 * 
 * @example
 * // Show button only for ADMIN
 * <Authorize roles="ADMIN">
 *   <button>Delete User</button>
 * </Authorize>
 * 
 * @example
 * // Show content for ADMIN or MODERATOR
 * <Authorize roles={["ADMIN", "MODERATOR"]}>
 *   <ManagementPanel />
 * </Authorize>
 * 
 * @example
 * // Show fallback if no access
 * <Authorize roles="ADMIN" fallback={<p>Access Denied</p>}>
 *   <AdminPanel />
 * </Authorize>
 */
const Authorize: React.FC<AuthorizeProps> = ({
  children,
  roles,
  requireAll = false,
  fallback = null,
}) => {
  const { user, hasRole, hasAnyRole } = useAuthContext();

  // If no roles specified, just check if user is authenticated
  if (!roles) {
    return user ? <>{children}</> : <>{fallback}</>;
  }

  // Convert single role to array
  const roleArray = Array.isArray(roles) ? roles : [roles];

  // Check authorization
  let hasAccess = false;

  if (requireAll) {
    // User must have ALL specified roles
    hasAccess = roleArray.every(role => hasRole(role));
  } else {
    // User must have AT LEAST ONE of the specified roles
    hasAccess = hasAnyRole(roleArray);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default Authorize;
