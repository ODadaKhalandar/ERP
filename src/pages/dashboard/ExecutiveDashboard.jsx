import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, ShoppingCart, BarChart3, Package, Eye } from 'lucide-react';
import { salesAPI } from '../../services/api/sales';
import { customersAPI } from '../../services/api/customers';

const ExecutiveDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    monthlyTarget: 0
  });
  const [recentSales, setRecentSales] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock data for executive dashboard
      setStats({
        totalSales: 85420,
        totalCustomers: 156,
        pendingOrders: 8,
        monthlyTarget: 150000
      });

      setRecentSales([
        { id: 1, customer: 'Rajesh Kumar', amount: 12500, date: '2024-01-15', status: 'completed' },
        { id: 2, customer: 'Priya Sharma', amount: 8900, date: '2024-01-15', status: 'completed' },
        { id: 3, customer: 'Amit Patel', amount: 15600, date: '2024-01-14', status: 'pending' },
        { id: 4, customer: 'Sneha Reddy', amount: 7200, date: '2024-01-14', status: 'completed' }
      ]);

      setTopCustomers([
        { id: 1, name: 'Rajesh Kumar', totalSpent: 125000, lastOrder: '2024-01-15', ordersCount: 12 },
        { id: 2, name: 'Amit Patel', totalSpent: 98000, lastOrder: '2024-01-14', ordersCount: 8 },
        { id: 3, name: 'Priya Sharma', totalSpent: 87600, lastOrder: '2024-01-13', ordersCount: 10 },
        { id: 4, name: 'Sneha Reddy', totalSpent: 65400, lastOrder: '2024-01-12', ordersCount: 7 }
      ]);
    } catch (error) {
      console.error('Error loading executive dashboard data:', error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, trend, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const progressPercentage = (stats.totalSales / stats.monthlyTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
        <p className="text-gray-600">Sales and customer management overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value={`₹${stats.totalSales.toLocaleString()}`}
          icon={TrendingUp}
          trend={8.2}
          color="bg-green-500"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={Users}
          trend={12.5}
          color="bg-blue-500"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={ShoppingCart}
          color="bg-orange-500"
        />
        <StatCard
          title="Monthly Target"
          value={`₹${stats.monthlyTarget.toLocaleString()}`}
          icon={BarChart3}
          subtitle={`${progressPercentage.toFixed(1)}% achieved`}
          color="bg-purple-500"
        />
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Monthly Sales Target</span>
          <span className="text-sm font-medium text-gray-900">
            ₹{stats.totalSales.toLocaleString()} / ₹{stats.monthlyTarget.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-green-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">Start: 1st Jan</span>
          <span className="text-xs text-gray-500">Target: ₹1,50,000</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{sale.customer}</p>
                  <p className="text-sm text-gray-500">{sale.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{sale.amount.toLocaleString()}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    sale.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Customers</h3>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.ordersCount} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">₹{customer.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Last: {customer.lastOrder}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ShoppingCart className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">New Sale</p>
              <p className="text-sm text-gray-500">Create new sales order</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Add Customer</p>
              <p className="text-sm text-gray-500">Register new customer</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">View Reports</p>
              <p className="text-sm text-gray-500">Sales analytics</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;