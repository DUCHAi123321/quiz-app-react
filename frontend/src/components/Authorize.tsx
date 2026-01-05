import { type ReactNode } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';

interface AuthorizeProps {
  children: ReactNode;
  roles?: string | string[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

const Authorize: React.FC<AuthorizeProps> = ({
  children,
  roles,
  requireAll = false,
  fallback = null,
}) => {
  const { user, hasRole, hasAnyRole } = useAuthContext();

  if (!roles) {
    return user ? <>{children}</> : <>{fallback}</>;
  }

  const roleArray = Array.isArray(roles) ? roles : [roles];

  let hasAccess = false;

  if (requireAll) {
    hasAccess = roleArray.every(role => hasRole(role));
  } else {
    hasAccess = hasAnyRole(roleArray);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default Authorize;
