import React, { useState } from 'react';
import TenantList from '../../components/admin/TenantList';
import TenantForm from '../../components/admin/TenantForm';

const TenantManagement = () => {
  const [showTenantForm, setShowTenantForm] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);

  const handleAddTenant = () => {
    setEditingTenant(null);
    setShowTenantForm(true);
  };

  const handleEditTenant = (tenant) => {
    setEditingTenant(tenant);
    setShowTenantForm(true);
  };

  const handleViewDetails = (tenant) => {
    // Navigate to tenant details page
    console.log('View tenant details:', tenant);
  };

  const handleSaveTenant = (savedTenant) => {
    setShowTenantForm(false);
    setEditingTenant(null);
    // Refresh tenant list or update state
    console.log('Tenant saved:', savedTenant);
  };

  const handleCancelForm = () => {
    setShowTenantForm(false);
    setEditingTenant(null);
  };

  return (
    <div>
      <TenantList
        onAddTenant={handleAddTenant}
        onEditTenant={handleEditTenant}
        onViewDetails={handleViewDetails}
      />

      {showTenantForm && (
        <TenantForm
          tenant={editingTenant}
          onSave={handleSaveTenant}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default TenantManagement;