import apiClient from './client';

export const ordersAPI = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/tenant/orders', orderData);
      return response;
    } catch (error) {
      console.error('Error creating order:', error);
      return { success: false, message: 'Failed to create order' };
    }
  },

  // Get all orders
  getOrders: async (filters = {}) => {
    try {
      const response = await apiClient.get('/tenant/orders', { params: filters });
      return response;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return { success: false, message: 'Failed to fetch orders' };
    }
  },

  // Get single order
  getOrder: async (orderId) => {
    try {
      const response = await apiClient.get(`/tenant/orders/${orderId}`);
      return response;
    } catch (error) {
      console.error('Error fetching order:', error);
      return { success: false, message: 'Failed to fetch order' };
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await apiClient.patch(`/tenant/orders/${orderId}/status`, { status });
      return response;
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, message: 'Failed to update order status' };
    }
  },

  // Get order statistics
  getOrderStats: async () => {
    try {
      const response = await apiClient.get('/tenant/orders/stats');
      return response;
    } catch (error) {
      console.error('Error fetching order stats:', error);
      return { success: false, message: 'Failed to fetch order statistics' };
    }
  }
};