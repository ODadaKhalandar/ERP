import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerManagement from '../pages/customers/CustomerManagement';
// Layouts
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Dashboard Pages
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import ManagerDashboard from '../pages/dashboard/ManagerDashboard';
import ExecutiveDashboard from '../pages/dashboard/ExecutiveDashboard';
import CustomerDashboard from '../pages/dashboard/CustomerDashboard';
import ProductManagement from '../pages/products/ProductManagement';
// Common Pages
import Profile from '../pages/common/Profile';
import SalesManagement from '../pages/sales/SalesManagement';
import Analytics from '../pages/reports/Analytics';
// Admin Pages
import TenantManagement from '../pages/admin/TenantManagement';
import UserManagement from '../pages/admin/UserManagement';

// Placeholder components for Phase 3+


const PointOfSale = () => <div className="p-6">Point of Sale - Phase 5</div>;
const OrderManagement = () => <div className="p-6">Order Management - Phase 5</div>;
// const Analytics = () => <div className="p-6">Analytics - Phase 6</div>;
const FinancialReports = () => <div className="p-6">Financial Reports - Phase 6</div>;

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={
                    <AuthLayout>
                        <Login />
                    </AuthLayout>
                } />

                <Route path="/register" element={
                    <AuthLayout>
                        <Register />
                    </AuthLayout>
                } />

                {/* Dashboard Routes - All routes accessible without authentication */}
                <Route path="/" element={<DashboardLayout />}>
                    {/* Dashboard Pages */}
                    <Route path="dashboard" element={<ManagerDashboard />} />
                    <Route path="admin/dashboard" element={<AdminDashboard />} />
                    <Route path="executive/dashboard" element={<ExecutiveDashboard />} />
                    <Route path="customer/dashboard" element={<CustomerDashboard />} />
                    <Route path="sales" element={<SalesManagement />} />
                    <Route path="sales/pos" element={<SalesManagement />} />
                    <Route path="sales/orders" element={<SalesManagement />} />
                    {/* <Route path="reports" element={<Analytics />} />
                    <Route path="reports/analytics" element={<Analytics />} />
                    <Route path="reports/financial" element={<Analytics />} /> */}
                    {/* Profile */}
                    <Route path="profile" element={<Profile />} />

                    {/* Products */}
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="products/management" element={<ProductManagement />} />
                    <Route path="products/inventory" element={<ProductManagement />} />

                    {/* Customers */}
                    <Route path="customers" element={<CustomerManagement />} />
                    <Route path="customers/:id" element={<CustomerManagement />} />

                    {/* Sales */}
                    <Route path="sales" element={<OrderManagement />} />
                    <Route path="sales/pos" element={<PointOfSale />} />
                    <Route path="sales/orders" element={<OrderManagement />} />

                    {/* Reports */}
                    <Route path="reports" element={<Analytics />} />
                    <Route path="reports/analytics" element={<Analytics />} />
                    <Route path="reports/financial" element={<FinancialReports />} />

                    {/* Admin */}
                    <Route path="admin" element={<TenantManagement />} />
                    <Route path="admin/tenants" element={<TenantManagement />} />

                    {/* Default redirect to manager dashboard */}
                    <Route index element={<Navigate to="/dashboard" replace />} />
                </Route>

                {/* Catch all route - redirect to dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;