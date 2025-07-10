import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
