import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRoles?: string[];
  redirectTo?: string;
}

/**
 * ProtectedRoute component to guard routes based on authentication and authorization
 * 
 * @param children - The component to render if access is granted
 * @param requireAuth - Whether the route requires authentication (default: true)
 * @param requireRoles - Array of roles required to access this route
 * @param redirectTo - Custom redirect path (default: /auth/login or /forbidden)
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireRoles = [],
  redirectTo,
}) => {
  const { isAuthenticated, hasAnyRole } = useAuthContext();
  const location = useLocation();

  // Check authentication
  if (requireAuth && !isAuthenticated) {
    // Save the attempted URL to redirect back after login
    const returnUrl = location.pathname + location.search;
    return (
      <Navigate
        to={redirectTo || '/auth/login'}
        state={{ from: returnUrl }}
        replace
      />
    );
  }

  // Check authorization (roles)
  if (requireRoles.length > 0 && !hasAnyRole(requireRoles)) {
    return (
      <Navigate
        to={redirectTo || '/forbidden'}
        replace
      />
    );
  }

  // If all checks pass, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
