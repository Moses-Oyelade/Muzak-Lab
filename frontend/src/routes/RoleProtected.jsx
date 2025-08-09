import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RoleProtectedPage = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  // If you track roles, check here, e.g.,
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleProtectedPage;
