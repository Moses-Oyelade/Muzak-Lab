import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const RoleProtectedRoute = ({ allowedRoles}) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  const userRoles = Array.isArray(user.roles) ? user.roles : [user.role];

  //Making the argument into lowercase
  const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());
  const normalizedUserRoles = userRoles.map(r => r.toLowerCase());

  const isAuthorized = normalizedAllowed.some(role => normalizedUserRoles.includes(role));

  // If you track roles, check here, e.g.,
  if (!isAuthorized) {
    console.log("this is not:", user?.role)
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
