import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import ExecutiveDashboard from '../pages/dashboard/ExecutiveDashboard';

// Placeholder components for Phase 3+
const CustomerManagement = () => <div>Customer Management - Phase 4</div>;
const OrderManagement = () => <div>Order Management - Phase 5</div>;
const Analytics = () => <div>Analytics - Phase 6</div>;

const ExecutiveRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/dashboard" element={<ExecutiveDashboard />} />
      
      {/* Customers */}
      <Route path="/customers" element={<CustomerManagement />} />
      <Route path="/customers/:id" element={<CustomerManagement />} />
      
      {/* Sales */}
      <Route path="/sales" element={<OrderManagement />} />
      <Route path="/sales/orders" element={<OrderManagement />} />
      
      {/* Reports */}
      <Route path="/reports" element={<Analytics />} />
    </Routes>
  );
};

export default ExecutiveRoutes;