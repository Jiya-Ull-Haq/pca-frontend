import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: ReactNode;
    fallbackPath: string;
  }
  
  const ProtectedRoute = ({element, fallbackPath}: ProtectedRouteProps) => {
    let authenticated: boolean;
    localStorage.getItem('auth') ? authenticated = true : authenticated = false;

    if (!authenticated) {
      return <Navigate to={fallbackPath} replace />;
    } else {
      return <>{element}</>;
    }
  };

  export default ProtectedRoute;