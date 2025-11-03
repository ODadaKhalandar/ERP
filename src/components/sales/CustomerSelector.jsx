import React, { useState, useEffect } from 'react';
import { Search, User, UserPlus } from 'lucide-react';

const CustomerSelector = ({ selectedCustomer, onSelectCustomer, onAddNewCustomer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
      setShowDropdown(true);
    } else {
      setFilteredCustomers([]);
      setShowDropdown(false);
    }
  }, [searchTerm, customers]);

  const loadCustomers = async () => {
    try {
      // Mock customers data
      const mockCustomers = [
        {
          id: '1',
          name: 'Rajesh Kumar',
          phone: '+91 9876543210',
          email: 'rajesh@example.com',
          outstanding_balance: 12500.00
        },
        {
          id: '2',
          name: 'Priya Sharma',
          phone: '+91 8765432109',
          email: 'priya@example.com',
          outstanding_balance: 0.00
        },
        {
          id: '3',
          name: 'Amit Patel',
          phone: '+91 7654321098',
          email: 'amit@example.com',
          outstanding_balance: 8500.00
        }
      ];
      setCustomers(mockCustomers);
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  };

  const handleSelectCustomer = (customer) => {
    onSelectCustomer(customer);
    setSearchTerm(customer.name);
    setShowDropdown(false);
  };

  const handleClearCustomer = () => {
    onSelectCustomer(null);
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Customer</h3>
        <button
          onClick={onAddNewCustomer}
          className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
        >
          <UserPlus className="w-4 h-4" />
          New Customer
        </button>
      </div>

      {/* Customer Search/Display */}
      <div className="relative">
        {selectedCustomer ? (
          // Display selected customer
          <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{selectedCustomer.name}</h4>
                <div className="text-sm text-gray-500">
                  {selectedCustomer.phone} • {selectedCustomer.email}
                </div>
                {selectedCustomer.outstanding_balance > 0 && (
                  <div className="text-sm text-orange-600 font-medium">
                    Outstanding: ₹{selectedCustomer.outstanding_balance.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleClearCustomer}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Change
            </button>
          </div>
        ) : (
          // Customer search
          <>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Search customer by name, phone, or email..."
              />
            </div>

            {/* Customer Dropdown */}
            {showDropdown && filteredCustomers.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredCustomers.map((customer) => (
                  <button
                    key={customer.id}
                    onClick={() => handleSelectCustomer(customer)}
                    className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">
                          {customer.phone} • {customer.email}
                        </div>
                      </div>
                      {customer.outstanding_balance > 0 && (
                        <div className="text-sm text-orange-600 font-medium">
                          ₹{customer.outstanding_balance.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {showDropdown && searchTerm && filteredCustomers.length === 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center">
                <User className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-gray-500">No customers found</p>
                <button
                  onClick={onAddNewCustomer}
                  className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Add new customer
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Walk-in Customer Option */}
      {!selectedCustomer && (
        <button
          onClick={() => onSelectCustomer({
            id: 'walkin',
            name: 'Walk-in Customer',
            phone: 'N/A',
            email: 'N/A',
            outstanding_balance: 0
          })}
          className="w-full mt-3 flex items-center gap-2 justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">Walk-in Customer</span>
        </button>
      )}
    </div>
  );
};

export default CustomerSelector;