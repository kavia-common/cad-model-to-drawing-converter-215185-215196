import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// PUBLIC_INTERFACE
export default function PrivateRoute({ children }) {
  /** Protect child route by verifying authentication presence. */
  const { isAuthenticated } = useAuth() || { isAuthenticated: false };
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
