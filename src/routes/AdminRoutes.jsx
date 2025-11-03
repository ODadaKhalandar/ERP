// import React from 'react';
// import { Routes, Route } from 'react-router-dom';

// // Pages
// import AdminDashboard from '../pages/dashboard/AdminDashboard';
// import TenantManagement from '../pages/admin/TenantManagement';
// import UserManagement from '../pages/admin/UserManagement';

// // Placeholder components for Phase 3+
// const ProductsManagement = () => <div>Products Management - Phase 3</div>;
// const CustomerManagement = () => <div>Customer Management - Phase 4</div>;
// const PointOfSale = () => <div>Point of Sale - Phase 5</div>;
// const OrderManagement = () => <div>Order Management - Phase 5</div>;
// const Analytics = () => <div>Analytics - Phase 6</div>;
// const FinancialReports = () => <div>Financial Reports - Phase 6</div>;

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       {/* Dashboard */}
//       <Route path="/dashboard" element={<AdminDashboard />} />
      
//       {/* Products */}
//       <Route path="/products" element={<ProductsManagement />} />
//       <Route path="/products/management" element={<ProductsManagement />} />
//       <Route path="/products/inventory" element={<ProductsManagement />} />
      
//       {/* Customers */}
//       <Route path="/customers" element={<CustomerManagement />} />
//       <Route path="/customers/:id" element={<CustomerManagement />} />
      
//       {/* Sales */}
//       <Route path="/sales" element={<OrderManagement />} />
//       <Route path="/sales/pos" element={<PointOfSale />} />
//       <Route path="/sales/orders" element={<OrderManagement />} />
      
//       {/* Reports */}
//       <Route path="/reports" element={<Analytics />} />
//       <Route path="/reports/analytics" element={<Analytics />} />
//       <Route path="/reports/financial" element={<FinancialReports />} />
      
//       {/* Admin */}
//       <Route path="/admin" element={<TenantManagement />} />
//       <Route path="/admin/tenants" element={<TenantManagement />} />
//       <Route path="/admin/users" element={<UserManagement />} />
//     </Routes>
//   );
// };

// export default AdminRoutes;