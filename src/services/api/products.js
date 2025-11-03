import apiClient from './client';

export const productsAPI = {
  // Get all products
  getProducts: async (filters = {}) => {
    try {
      const response = await apiClient.get('/tenant/products', { params: filters });
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      return { success: false, message: 'Failed to fetch products' };
    }
  },

  // Get single product
  getProduct: async (productId) => {
    try {
      const response = await apiClient.get(`/tenant/products/${productId}`);
      return response;
    } catch (error) {
      console.error('Error fetching product:', error);
      return { success: false, message: 'Failed to fetch product' };
    }
  },

  // Create product
  createProduct: async (productData) => {
    try {
      const response = await apiClient.post('/tenant/products', productData);
      return response;
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, message: 'Failed to create product' };
    }
  },

  // Update product
  updateProduct: async (productId, productData) => {
    try {
      const response = await apiClient.put(`/tenant/products/${productId}`, productData);
      return response;
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false, message: 'Failed to update product' };
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    try {
      const response = await apiClient.delete(`/tenant/products/${productId}`);
      return response;
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, message: 'Failed to delete product' };
    }
  },

  // Update stock
  updateStock: async (productId, quantity) => {
    try {
      const response = await apiClient.patch('/tenant/products/stock', {
        product_id: productId,
        quantity: quantity
      });
      return response;
    } catch (error) {
      console.error('Error updating stock:', error);
      return { success: false, message: 'Failed to update stock' };
    }
  },

  // Bulk operations
  bulkUpdate: async (productIds, updateData) => {
    try {
      const response = await apiClient.patch('/tenant/products/bulk-update', {
        product_ids: productIds,
        update_data: updateData
      });
      return response;
    } catch (error) {
      console.error('Error bulk updating products:', error);
      return { success: false, message: 'Failed to update products' };
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await apiClient.get('/tenant/products/categories');
      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { success: false, message: 'Failed to fetch categories' };
    }
  },

  // Get low stock products
  getLowStock: async () => {
    try {
      const response = await apiClient.get('/tenant/products/low-stock');
      return response;
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      return { success: false, message: 'Failed to fetch low stock products' };
    }
  }
};