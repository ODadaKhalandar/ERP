import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password, tenantSubdomain) => {
    setLoading(true);
    
    // Mock login for testing - always succeed
    setTimeout(() => {
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email: email,
        role: email.includes('admin') ? 'admin' : 
              email.includes('executive') ? 'executive' : 
              email.includes('customer') ? 'customer' : 'manager',
        tenant: {
          id: 'tenant-1',
          name: tenantSubdomain + ' Shop',
          domain: tenantSubdomain
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('userData', JSON.stringify(mockUser));
      localStorage.setItem('tenantSubdomain', tenantSubdomain);
      setLoading(false);
      
      return { success: true };
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('tenantSubdomain');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};