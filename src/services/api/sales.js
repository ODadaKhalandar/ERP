import apiClient from './client';

export const salesAPI = {
  // Create new sale
  createSale: async (saleData) => {
    try {
      const response = await apiClient.post('/tenant/sales', saleData);
      return response;
    } catch (error) {
      console.error('Error creating sale:', error);
      return { success: false, message: 'Failed to create sale' };
    }
  },

  // Get all sales
  getSales: async (filters = {}) => {
    try {
      const response = await apiClient.get('/tenant/sales', { params: filters });
      return response;
    } catch (error) {
      console.error('Error fetching sales:', error);
      return { success: false, message: 'Failed to fetch sales' };
    }
  },

  // Get single sale
  getSale: async (saleId) => {
    try {
      const response = await apiClient.get(`/tenant/sales/${saleId}`);
      return response;
    } catch (error) {
      console.error('Error fetching sale:', error);
      return { success: false, message: 'Failed to fetch sale' };
    }
  },

  // Update sale
  updateSale: async (saleId, saleData) => {
    try {
      const response = await apiClient.put(`/tenant/sales/${saleId}`, saleData);
      return response;
    } catch (error) {
      console.error('Error updating sale:', error);
      return { success: false, message: 'Failed to update sale' };
    }
  },

  // Delete sale
  deleteSale: async (saleId) => {
    try {
      const response = await apiClient.delete(`/tenant/sales/${saleId}`);
      return response;
    } catch (error) {
      console.error('Error deleting sale:', error);
      return { success: false, message: 'Failed to delete sale' };
    }
  },

  // Get today's sales
  getTodaySales: async () => {
    try {
      const response = await apiClient.get('/tenant/sales/today');
      return response;
    } catch (error) {
      console.error('Error fetching today sales:', error);
      return { success: false, message: 'Failed to fetch today sales' };
    }
  }
};