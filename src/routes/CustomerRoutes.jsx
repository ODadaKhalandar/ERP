import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import CustomerDashboard from '../pages/dashboard/CustomerDashboard';
import Profile from '../pages/common/Profile';

const CustomerRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/dashboard" element={<CustomerDashboard />} />
      
      {/* Profile */}
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default CustomerRoutes;