import { Navigate, Outlet } from 'react-router-dom';
import { useClientStore } from '../../../app/useClientStore';
import { useEffect } from 'react';

export default function ProtectedRoute() {
  const isAuthenticated = useClientStore((state) => state.isAuthenticated);
  const checkAuth = useClientStore((state) => state.checkAuth);
  const user = useClientStore((state) => state.user);

  useEffect(() => {
    if (isAuthenticated && !user) {
      checkAuth();
    }
  }, [isAuthenticated, user, checkAuth]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
