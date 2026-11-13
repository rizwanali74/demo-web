import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedAdminRoute({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

