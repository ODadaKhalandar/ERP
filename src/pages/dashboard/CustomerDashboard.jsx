import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, IndianRupee, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState({
    name: 'Rajesh Kumar',
    outstandingBalance: 12500,
    totalOrders: 15,
    memberSince: '2023-06-15'
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomerData();
  }, []);

  const loadCustomerData = async () => {
    try {
      // Mock data for customer dashboard
      setRecentOrders([
        {
          id: 'ORD-001',
          date: '2024-01-15',
          items: ['Urea Fertilizer (50kg)', 'NPK Complex (25kg)'],
          totalAmount: 12500,
          status: 'completed',
          deliveryDate: '2024-01-16'
        },
        {
          id: 'ORD-002',
          date: '2024-01-10',
          items: ['Potash Fertilizer (25kg)', 'DAP (50kg)'],
          totalAmount: 8900,
          status: 'completed',
          deliveryDate: '2024-01-11'
        },
        {
          id: 'ORD-003',
          date: '2024-01-08',
          items: ['Insecticide Spray (1L)', 'Weedicide (500ml)'],
          totalAmount: 1560,
          status: 'pending',
          deliveryDate: '2024-01-09'
        },
        {
          id: 'ORD-004',
          date: '2024-01-05',
          items: ['Urea Fertilizer (25kg)', 'Growth Promoter (250ml)'],
          totalAmount: 7200,
          status: 'completed',
          deliveryDate: '2024-01-06'
        }
      ]);
    } catch (error) {
      console.error('Error loading customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {customerData.name}!</h1>
          <p className="text-gray-600">Your orders and account overview</p>
        </div>
        <div className="flex gap-3">
          {customerData.outstandingBalance > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">
                Outstanding: ₹{customerData.outstandingBalance.toLocaleString()}
              </span>
            </div>
          )}
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <ShoppingCart className="w-4 h-4" />
            New Order
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Outstanding Balance"
          value={`₹${customerData.outstandingBalance.toLocaleString()}`}
          icon={IndianRupee}
          color="bg-orange-500"
          subtitle="Total pending amount"
        />
        <StatCard
          title="Total Orders"
          value={customerData.totalOrders}
          icon={ShoppingCart}
          color="bg-blue-500"
          subtitle="All time orders"
        />
        <StatCard
          title="Member Since"
          value={new Date(customerData.memberSince).getFullYear()}
          icon={Package}
          color="bg-green-500"
          subtitle={`Since ${new Date(customerData.memberSince).toLocaleDateString()}`}
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <p className="text-gray-600">Your recent purchase history</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{order.id}</h4>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {order.items.join(', ')}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>Order Date: {new Date(order.date).toLocaleDateString()}</span>
                      {order.deliveryDate && (
                        <span>Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{order.totalAmount.toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                        View Details
                      </button>
                      {order.status === 'pending' && (
                        <button className="px-3 py-1 text-sm text-green-600 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && recentOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-2 text-gray-500">Get started by placing your first order</p>
            <button className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              <ShoppingCart className="w-4 h-4" />
              Place Order
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ShoppingCart className="w-8 h-8 text-green-600" />
            <span className="font-medium text-gray-900">New Order</span>
            <span className="text-sm text-gray-500 text-center">Place new order</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <IndianRupee className="w-8 h-8 text-blue-600" />
            <span className="font-medium text-gray-900">Pay Balance</span>
            <span className="text-sm text-gray-500 text-center">Clear dues</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="w-8 h-8 text-purple-600" />
            <span className="font-medium text-gray-900">Products</span>
            <span className="text-sm text-gray-500 text-center">Browse catalog</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CheckCircle className="w-8 h-8 text-orange-600" />
            <span className="font-medium text-gray-900">Order History</span>
            <span className="text-sm text-gray-500 text-center">View all orders</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;