import React, { useState } from 'react';
import { ShoppingCart, List, Plus } from 'lucide-react';
import POSInterface from '../../components/sales/POSInterface';

const SalesManagement = () => {
  const [activeTab, setActiveTab] = useState('pos');

  const tabs = [
    { id: 'pos', name: 'Point of Sale', icon: ShoppingCart },
    { id: 'orders', name: 'Order Management', icon: List }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
          <p className="text-gray-600">Process sales and manage orders</p>
        </div>
        <button 
          onClick={() => setActiveTab('pos')}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Sale
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'pos' && <POSInterface />}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <List className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Order Management</h3>
            <p className="mt-2 text-gray-500">
              Order management functionality will be implemented in the next phase.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900">Sales Orders</h4>
                <p className="text-sm text-gray-500 mt-1">View and manage all orders</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900">Order History</h4>
                <p className="text-sm text-gray-500 mt-1">Track order status and history</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900">Returns</h4>
                <p className="text-sm text-gray-500 mt-1">Process returns and refunds</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesManagement;