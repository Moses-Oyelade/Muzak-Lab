import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center h-screen">
  <p className="text-xl">Checking authentication...</p>
</div>;

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
