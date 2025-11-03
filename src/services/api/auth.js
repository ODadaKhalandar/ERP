import apiClient from './client';

export const authAPI = {
  login: async (email, password, tenantSubdomain) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
      tenantSubdomain
    });
    return response;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tenantSubdomain');
    localStorage.removeItem('userData');
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response;
  }
};