import React, { useState } from 'react';
import CustomerList from '../../components/customers/CustomerList';
import CustomerForm from '../../components/customers/CustomerForm';

const CustomerManagement = () => {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowCustomerForm(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowCustomerForm(true);
  };

  const handleViewDetails = (customer) => {
    // Navigate to customer details page
    console.log('View customer details:', customer);
  };

  const handleSaveCustomer = (savedCustomer) => {
    setShowCustomerForm(false);
    setEditingCustomer(null);
    // Refresh customer list or update state
    console.log('Customer saved:', savedCustomer);
  };

  const handleCancelForm = () => {
    setShowCustomerForm(false);
    setEditingCustomer(null);
  };

  return (
    <div>
      <CustomerList
        onAddCustomer={handleAddCustomer}
        onEditCustomer={handleEditCustomer}
        onViewDetails={handleViewDetails}
      />

      {showCustomerForm && (
        <CustomerForm
          customer={editingCustomer}
          onSave={handleSaveCustomer}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default CustomerManagement;