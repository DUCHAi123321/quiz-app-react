import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRoles?: string[];
  redirectTo?: string;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireRoles = [],
  redirectTo,
}) => {
  const { isAuthenticated, hasAnyRole } = useAuthContext();
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    const returnUrl = location.pathname + location.search;
    return (
      <Navigate
        to={redirectTo || '/auth/login'}
        state={{ from: returnUrl }}
        replace
      />
    );
  }

  if (requireRoles.length > 0 && !hasAnyRole(requireRoles)) {
    return (
      <Navigate
        to={redirectTo || '/forbidden'}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
