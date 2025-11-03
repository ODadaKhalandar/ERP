import apiClient from './client';

export const adminAPI = {
  // Get all tenants (shops)
  getAllTenants: async (filters = {}) => {
    try {
      const response = await apiClient.get('/tenants', { params: filters });
      return response;
    } catch (error) {
      console.error('Error fetching tenants:', error);
      return { success: false, message: 'Failed to fetch tenants' };
    }
  },

  // Create new tenant (shop)
  createTenant: async (tenantData) => {
    try {
      const response = await apiClient.post('/tenants/register', tenantData);
      return response;
    } catch (error) {
      console.error('Error creating tenant:', error);
      return { success: false, message: 'Failed to create tenant' };
    }
  },

  // Update tenant
  updateTenant: async (tenantId, tenantData) => {
    try {
      const response = await apiClient.put(`/tenants/${tenantId}`, tenantData);
      return response;
    } catch (error) {
      console.error('Error updating tenant:', error);
      return { success: false, message: 'Failed to update tenant' };
    }
  },

  // Delete tenant
  deleteTenant: async (tenantId) => {
    try {
      const response = await apiClient.delete(`/tenants/${tenantId}`);
      return response;
    } catch (error) {
      console.error('Error deleting tenant:', error);
      return { success: false, message: 'Failed to delete tenant' };
    }
  },

  // Get tenant statistics
  getTenantStats: async () => {
    try {
      const response = await apiClient.get('/tenants/stats');
      return response;
    } catch (error) {
      console.error('Error fetching tenant stats:', error);
      return { success: false, message: 'Failed to fetch tenant statistics' };
    }
  },

  // Activate/Deactivate tenant
  toggleTenantStatus: async (tenantId, isActive) => {
    try {
      const response = await apiClient.patch(`/tenants/${tenantId}/status`, { is_active: isActive });
      return response;
    } catch (error) {
      console.error('Error toggling tenant status:', error);
      return { success: false, message: 'Failed to update tenant status' };
    }
  }
};