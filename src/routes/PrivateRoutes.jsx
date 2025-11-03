import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePermissions } from '../hooks/usePermissions';

// Layout
import DashboardLayout from '../layouts/DashboardLayout';

// Route Components
import AdminRoutes from './AdminRoutes';
import ManagerRoutes from './ManagerRoutes';
import ExecutiveRoutes from './ExecutiveRoutes';
import CustomerRoutes from './CustomerRoutes';

// Common Pages
import Profile from '../pages/common/Profile';

// Components
import LoadingSpinner from '../components/common/LoadingSpinner';
import Unauthorized from '../pages/common/Unauthorized';

const PrivateRoutes = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const { hasPermission } = usePermissions();

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render role-specific routes
  const renderRoleRoutes = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminRoutes />;
      case 'manager':
        return <ManagerRoutes />;
      case 'executive':
        return <ExecutiveRoutes />;
      case 'customer':
        return <CustomerRoutes />;
      default:
        return <Unauthorized />;
    }
  };

  return (
    <DashboardLayout>
      <Routes>
        {/* Common routes for all roles */}
        <Route path="/profile" element={<Profile />} />
        
        {/* Role-specific routes */}
        {renderRoleRoutes()}
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default PrivateRoutes;