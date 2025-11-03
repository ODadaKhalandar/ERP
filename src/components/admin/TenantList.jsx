import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download, Store, Mail, Phone, MapPin, User, Activity, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { adminAPI } from '../../services/api/admin';
import SearchBar from '../common/SearchBar';
import FilterPanel from '../common/FilterPanel';

const TenantList = ({ onAddTenant, onEditTenant, onViewDetails }) => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    plan: 'all'
  });

  useEffect(() => {
    loadTenants();
  }, [filters]);

  const loadTenants = async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockTenants = [
        {
          id: '1',
          shop_name: 'GreenField Fertilizers',
          shop_domain: 'greenfield',
          owner_name: 'Rajesh Kumar',
          email: 'rajesh@greenfield.com',
          phone: '+91 9876543210',
          address: '123 Main Street, Mumbai, Maharashtra',
          gst_number: '27ABCDE1234F1Z5',
          database_name: 'tenant_greenfield',
          subscription_plan: 'premium',
          is_active: true,
          created_at: '2024-01-01',
          total_users: 5,
          total_products: 45,
          total_customers: 120
        },
        {
          id: '2',
          shop_name: 'AgroPlus Solutions',
          shop_domain: 'agroplus',
          owner_name: 'Priya Sharma',
          email: 'priya@agroplus.com',
          phone: '+91 8765432109',
          address: '456 Oak Avenue, Delhi',
          gst_number: '07FGHIJ5678K2L9',
          database_name: 'tenant_agroplus',
          subscription_plan: 'basic',
          is_active: true,
          created_at: '2024-01-05',
          total_users: 3,
          total_products: 28,
          total_customers: 85
        },
        {
          id: '3',
          shop_name: 'CropMaster Enterprises',
          shop_domain: 'cropmaster',
          owner_name: 'Amit Patel',
          email: 'amit@cropmaster.com',
          phone: '+91 7654321098',
          address: '789 Pine Road, Bangalore',
          gst_number: '29MNOPQ9012R3S6',
          database_name: 'tenant_cropmaster',
          subscription_plan: 'premium',
          is_active: false,
          created_at: '2024-01-10',
          total_users: 2,
          total_products: 32,
          total_customers: 67
        }
      ];
      setTenants(mockTenants);
    } catch (error) {
      console.error('Error loading tenants:', error);
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

  const handleToggleStatus = async (tenantId, currentStatus) => {
    try {
      // Simulate API call
      setTenants(prev => prev.map(tenant => 
        tenant.id === tenantId 
          ? { ...tenant, is_active: !currentStatus }
          : tenant
      ));
    } catch (error) {
      console.error('Error toggling tenant status:', error);
    }
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.shop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = (filters.status === 'all' || 
                           (filters.status === 'active' && tenant.is_active) ||
                           (filters.status === 'inactive' && !tenant.is_active)) &&
                          (filters.plan === 'all' || tenant.subscription_plan === filters.plan);

    return matchesSearch && matchesFilters;
  });

  const stats = {
    total: tenants.length,
    active: tenants.filter(t => t.is_active).length,
    premium: tenants.filter(t => t.subscription_plan === 'premium').length,
    basic: tenants.filter(t => t.subscription_plan === 'basic').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600">Manage all fertilizer shops in your platform</p>
        </div>
        <button
          onClick={onAddTenant}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Register New Shop
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Shops</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Store className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Shops</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Premium Plans</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.premium}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Store className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Basic Plans</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.basic}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <Store className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search shops by name, owner, or email..."
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
                  key: 'plan',
                  label: 'Subscription Plan',
                  type: 'select',
                  options: [
                    { value: 'all', label: 'All Plans' },
                    { value: 'premium', label: 'Premium' },
                    { value: 'basic', label: 'Basic' }
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
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shop Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscription
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statistics
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Store className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {tenant.shop_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {tenant.shop_domain}.fertilizererp.com
                          </div>
                          <div className="text-xs text-gray-400">
                            DB: {tenant.database_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tenant.owner_name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {tenant.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {tenant.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tenant.subscription_plan === 'premium' 
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tenant.subscription_plan}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Since {new Date(tenant.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{tenant.total_users}</div>
                          <div className="text-gray-500">Users</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{tenant.total_products}</div>
                          <div className="text-gray-500">Products</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{tenant.total_customers}</div>
                          <div className="text-gray-500">Customers</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(tenant.id, tenant.is_active)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          tenant.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {tenant.is_active ? (
                          <>
                            <ToggleRight className="w-4 h-4 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-4 h-4 mr-1" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewDetails(tenant)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onEditTenant(tenant)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTenants.length === 0 && (
          <div className="text-center py-12">
            <Store className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No shops found</h3>
            <p className="mt-2 text-gray-500">
              {searchTerm || Object.values(filters).some(Boolean) 
                ? 'Try adjusting your search or filters'
                : 'Get started by registering your first shop'
              }
            </p>
            {!searchTerm && !Object.values(filters).some(Boolean) && (
              <button
                onClick={onAddTenant}
                className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Plus className="w-4 h-4" />
                Register New Shop
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantList;