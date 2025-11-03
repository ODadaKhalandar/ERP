import apiClient from './client';

export const customersAPI = {
  // Get all customers
  getCustomers: async (filters = {}) => {
    try {
      const response = await apiClient.get('/tenant/customers', { params: filters });
      return response;
    } catch (error) {
      console.error('Error fetching customers:', error);
      return { success: false, message: 'Failed to fetch customers' };
    }
  },

  // Get single customer
  getCustomer: async (customerId) => {
    try {
      const response = await apiClient.get(`/tenant/customers/${customerId}`);
      return response;
    } catch (error) {
      console.error('Error fetching customer:', error);
      return { success: false, message: 'Failed to fetch customer' };
    }
  },

  // Create customer
  createCustomer: async (customerData) => {
    try {
      const response = await apiClient.post('/tenant/customers', customerData);
      return response;
    } catch (error) {
      console.error('Error creating customer:', error);
      return { success: false, message: 'Failed to create customer' };
    }
  },

  // Update customer
  updateCustomer: async (customerId, customerData) => {
    try {
      const response = await apiClient.put(`/tenant/customers/${customerId}`, customerData);
      return response;
    } catch (error) {
      console.error('Error updating customer:', error);
      return { success: false, message: 'Failed to update customer' };
    }
  },

  // Delete customer
  deleteCustomer: async (customerId) => {
    try {
      const response = await apiClient.delete(`/tenant/customers/${customerId}`);
      return response;
    } catch (error) {
      console.error('Error deleting customer:', error);
      return { success: false, message: 'Failed to delete customer' };
    }
  },

  // Get customer orders
  getCustomerOrders: async (customerId) => {
    try {
      const response = await apiClient.get(`/tenant/customers/${customerId}/orders`);
      return response;
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      return { success: false, message: 'Failed to fetch customer orders' };
    }
  },

  // Update customer credit
  updateCustomerCredit: async (customerId, creditData) => {
    try {
      const response = await apiClient.patch(`/tenant/customers/${customerId}/credit`, creditData);
      return response;
    } catch (error) {
      console.error('Error updating customer credit:', error);
      return { success: false, message: 'Failed to update customer credit' };
    }
  },

  // Get customers with outstanding balance
  getCustomersWithBalance: async () => {
    try {
      const response = await apiClient.get('/tenant/customers/outstanding-balance');
      return response;
    } catch (error) {
      console.error('Error fetching customers with balance:', error);
      return { success: false, message: 'Failed to fetch customers with balance' };
    }
  }
};