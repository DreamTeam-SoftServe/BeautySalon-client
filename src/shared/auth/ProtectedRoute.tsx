import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context'; 

export function ProtectedRoute() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return null; 

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}