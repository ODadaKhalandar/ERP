import React from 'react';
import { BarChart3, TrendingUp, Download } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Business intelligence and insights</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 text-center">
        <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Reports & Analytics</h3>
        <p className="mt-2 text-gray-500">
          Advanced reporting and analytics will be implemented in the next phase.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto" />
            <h4 className="font-semibold text-gray-900 mt-2">Sales Analytics</h4>
            <p className="text-sm text-gray-500 mt-1">Revenue trends and insights</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <BarChart3 className="w-8 h-8 text-green-600 mx-auto" />
            <h4 className="font-semibold text-gray-900 mt-2">Inventory Reports</h4>
            <p className="text-sm text-gray-500 mt-1">Stock levels and movements</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto" />
            <h4 className="font-semibold text-gray-900 mt-2">Customer Analytics</h4>
            <p className="text-sm text-gray-500 mt-1">Customer behavior and trends</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;