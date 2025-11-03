import React, { useState, useEffect } from 'react';
import { X, Save, Store, User, Mail, Phone, MapPin, FileText, Key } from 'lucide-react';

const TenantForm = ({ tenant, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    shop_name: '',
    shop_domain: '',
    owner_name: '',
    email: '',
    phone: '',
    address: '',
    gst_number: '',
    subscription_plan: 'basic',
    admin_password: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (tenant) {
      setFormData({
        shop_name: tenant.shop_name || '',
        shop_domain: tenant.shop_domain || '',
        owner_name: tenant.owner_name || '',
        email: tenant.email || '',
        phone: tenant.phone || '',
        address: tenant.address || '',
        gst_number: tenant.gst_number || '',
        subscription_plan: tenant.subscription_plan || 'basic',
        admin_password: '',
        confirm_password: ''
      });
    }
  }, [tenant]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.shop_name.trim()) {
      newErrors.shop_name = 'Shop name is required';
    }

    if (!formData.shop_domain.trim()) {
      newErrors.shop_domain = 'Shop domain is required';
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.shop_domain)) {
      newErrors.shop_domain = 'Domain can only contain lowercase letters, numbers, and hyphens';
    }

    if (!formData.owner_name.trim()) {
      newErrors.owner_name = 'Owner name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!tenant && !formData.admin_password) {
      newErrors.admin_password = 'Admin password is required';
    }

    if (!tenant && formData.admin_password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    if (formData.gst_number && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gst_number)) {
      newErrors.gst_number = 'Please enter a valid GST number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newTenant = {
        id: tenant ? tenant.id : Math.random().toString(36).substr(2, 9),
        ...formData,
        database_name: `tenant_${formData.shop_domain}`,
        is_active: true,
        created_at: new Date().toISOString()
      };
      
      onSave(newTenant);
      setLoading(false);
    }, 2000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const generateDomain = (shopName) => {
    return shopName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Store className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {tenant ? 'Edit Shop' : 'Register New Shop'}
              </h2>
              <p className="text-gray-600">
                {tenant ? 'Update shop information' : 'Register a new fertilizer shop on your platform'}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Shop Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Shop Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shop Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.shop_name}
                    onChange={(e) => {
                      const shopName = e.target.value;
                      handleChange('shop_name', shopName);
                      if (!tenant && !formData.shop_domain) {
                        handleChange('shop_domain', generateDomain(shopName));
                      }
                    }}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.shop_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter shop name"
                  />
                </div>
                {errors.shop_name && <p className="mt-1 text-sm text-red-600">{errors.shop_name}</p>}
              </div>

              {/* Shop Domain */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop Domain *
                </label>
                <div className="flex rounded-lg shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    https://
                  </span>
                  <input
                    type="text"
                    value={formData.shop_domain}
                    onChange={(e) => handleChange('shop_domain', e.target.value)}
                    className={`flex-1 min-w-0 block px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.shop_domain ? 'border-red-500' : ''
                    }`}
                    placeholder="shop-domain"
                  />
                  <span className="inline-flex items-center px-3 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-r-md">
                    .fertilizererp.com
                  </span>
                </div>
                {errors.shop_domain && <p className="mt-1 text-sm text-red-600">{errors.shop_domain}</p>}
                <p className="mt-1 text-sm text-gray-500">
                  This will be the unique URL for this shop
                </p>
              </div>

              {/* Subscription Plan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscription Plan *
                </label>
                <select
                  value={formData.subscription_plan}
                  onChange={(e) => handleChange('subscription_plan', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="basic">Basic Plan</option>
                  <option value="premium">Premium Plan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Owner Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Owner Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.owner_name}
                    onChange={(e) => handleChange('owner_name', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.owner_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter owner name"
                  />
                </div>
                {errors.owner_name && <p className="mt-1 text-sm text-red-600">{errors.owner_name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="owner@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+91 9876543210"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              {/* GST Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GST Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.gst_number}
                    onChange={(e) => handleChange('gst_number', e.target.value.toUpperCase())}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.gst_number ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="27ABCDE1234F1Z5"
                  />
                </div>
                {errors.gst_number && <p className="mt-1 text-sm text-red-600">{errors.gst_number}</p>}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complete Address
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    rows={3}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter complete shop address"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Admin Credentials (Only for new registration) */}
          {!tenant && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={formData.admin_password}
                      onChange={(e) => handleChange('admin_password', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                        errors.admin_password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter admin password"
                    />
                  </div>
                  {errors.admin_password && <p className="mt-1 text-sm text-red-600">{errors.admin_password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={formData.confirm_password}
                      onChange={(e) => handleChange('confirm_password', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                        errors.confirm_password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Confirm admin password"
                    />
                  </div>
                  {errors.confirm_password && <p className="mt-1 text-sm text-red-600">{errors.confirm_password}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Processing...' : (tenant ? 'Update Shop' : 'Register Shop')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantForm;