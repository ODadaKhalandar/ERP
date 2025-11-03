import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download, User, Phone, Mail, IndianRupee, AlertTriangle } from 'lucide-react';
import { customersAPI } from '../../services/api/customers';
import CustomerCard from './CustomerCard';
import SearchBar from '../common/SearchBar';
import FilterPanel from '../common/FilterPanel';

const CustomerList = ({ onAddCustomer, onEditCustomer, onViewDetails }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    hasBalance: false
  });
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, [filters]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockCustomers = [
        {
          id: '1',
          name: 'Rajesh Kumar',
          phone: '+91 9876543210',
          email: 'rajesh@example.com',
          address: '123 Main Street, Mumbai',
          gst_number: '27ABCDE1234F1Z5',
          outstanding_balance: 12500.00,
          total_purchases: 85000.00,
          last_order_date: '2024-01-15',
          is_active: true
        },
        {
          id: '2',
          name: 'Priya Sharma',
          phone: '+91 8765432109',
          email: 'priya@example.com',
          address: '456 Oak Avenue, Delhi',
          gst_number: '07FGHIJ5678K2L9',
          outstanding_balance: 0.00,
          total_purchases: 45000.00,
          last_order_date: '2024-01-10',
          is_active: true
        },
        {
          id: '3',
          name: 'Amit Patel',
          phone: '+91 7654321098',
          email: 'amit@example.com',
          address: '789 Pine Road, Bangalore',
          gst_number: '29MNOPQ9012R3S6',
          outstanding_balance: 8500.00,
          total_purchases: 120000.00,
          last_order_date: '2024-01-08',
          is_active: true
        },
        {
          id: '4',
          name: 'Sneha Reddy',
          phone: '+91 6543210987',
          email: 'sneha@example.com',
          address: '321 Elm Street, Hyderabad',
          gst_number: '36TUVWX3456Y7Z8',
          outstanding_balance: 0.00,
          total_purchases: 68000.00,
          last_order_date: '2024-01-12',
          is_active: true
        }
      ];
      setCustomers(mockCustomers);
    } catch (error) {
      console.error('Error loading customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCustomerSelect = (customerId, isSelected) => {
    if (isSelected) {
      setSelectedCustomers(prev => [...prev, customerId]);
    } else {
      setSelectedCustomers(prev => prev.filter(id => id !== customerId));
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = (filters.status === 'all' || 
                           (filters.status === 'active' && customer.is_active) ||
                           (filters.status === 'inactive' && !customer.is_active)) &&
                          (!filters.hasBalance || customer.outstanding_balance > 0);

    return matchesSearch && matchesFilters;
  });

  const totalOutstanding = customers.reduce((sum, customer) => sum + customer.outstanding_balance, 0);
  const customersWithBalance = customers.filter(customer => customer.outstanding_balance > 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer relationships</p>
        </div>
        <div className="flex gap-3">
          {customersWithBalance > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">
                ₹{totalOutstanding.toLocaleString()} outstanding
              </span>
            </div>
          )}
          <button
            onClick={onAddCustomer}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{customers.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {customers.filter(c => c.is_active).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <User className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Outstanding Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ₹{totalOutstanding.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <IndianRupee className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">With Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{customersWithBalance}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search customers by name, phone, or email..."
              onSearch={handleSearch}
            />
          </div>
          <div className="flex gap-3">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              filterConfig={[
                {
                  key: 'status',
                  label: 'Status',
                  type: 'select',
                  options: [
                    { value: 'all', label: 'All Status' },
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' }
                  ]
                },
                {
                  key: 'hasBalance',
                  label: 'Balance Status',
                  type: 'checkbox',
                  options: [
                    { value: true, label: 'Has Outstanding Balance' }
                  ]
                }
              ]}
            />
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCustomers.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedCustomers.length} customers selected
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                  Send Notification
                </button>
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                  Update Status
                </button>
                <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200">
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Customers Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map(customer => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onEdit={onEditCustomer}
              onViewDetails={onViewDetails}
              onSelect={handleCustomerSelect}
              isSelected={selectedCustomers.includes(customer.id)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No customers found</h3>
          <p className="mt-2 text-gray-500">
            {searchTerm || Object.values(filters).some(Boolean) 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first customer'
            }
          </p>
          {!searchTerm && !Object.values(filters).some(Boolean) && (
            <button
              onClick={onAddCustomer}
              className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              Add Customer
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerList;