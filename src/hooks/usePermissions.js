import { useAuth } from '../contexts/AuthContext';

const rolePermissions = {
  manager: {
    level: 100,
    modules: ['dashboard', 'products', 'customers', 'orders', 'reports', 'inventory', 'admin'],
    permissions: {
      dashboard: ['read', 'write', 'export'],
      products: ['create', 'read', 'update', 'delete', 'export'],
      customers: ['create', 'read', 'update', 'delete', 'export'],
      orders: ['create', 'read', 'update', 'delete', 'export', 'approve'],
      reports: ['create', 'read', 'update', 'delete', 'export'],
      inventory: ['create', 'read', 'update', 'delete', 'export'],
      admin: ['create', 'read', 'update', 'delete']
    }
  },
  executive: {
    level: 80,
    modules: ['dashboard', 'customers', 'orders', 'reports'],
    permissions: {
      dashboard: ['read', 'export'],
      customers: ['create', 'read', 'update', 'export'],
      orders: ['create', 'read', 'update', 'export'],
      reports: ['read', 'export']
    }
  },
  customer: {
    level: 50,
    modules: ['dashboard', 'orders'],
    permissions: {
      dashboard: ['read'],
      orders: ['create', 'read']
    }
  }
};

export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (module, action = 'read') => {
    if (!user?.role) return false;
    
    const roleConfig = rolePermissions[user.role];
    if (!roleConfig) return false;

    if (!roleConfig.modules.includes(module)) return false;

    const modulePermissions = roleConfig.permissions[module];
    return modulePermissions && modulePermissions.includes(action);
  };

  const canAccessModule = (module) => {
    return hasPermission(module, 'read');
  };

  const getAccessibleModules = () => {
    if (!user?.role) return [];
    return rolePermissions[user.role]?.modules || [];
  };

  const hasRoleLevel = (requiredLevel) => {
    if (!user?.role) return false;
    const userRoleConfig = rolePermissions[user.role];
    return userRoleConfig && userRoleConfig.level >= requiredLevel;
  };

  return {
    hasPermission,
    canAccessModule,
    getAccessibleModules,
    hasRoleLevel,
    userRole: user?.role
  };
};