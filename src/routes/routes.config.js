// Route configuration constants
export const ROUTES = {
  // Public routes
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Common routes
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  
  // Product routes
  PRODUCTS: '/products',
  PRODUCT_MANAGEMENT: '/products/management',
  INVENTORY: '/products/inventory',
  
  // Customer routes
  CUSTOMERS: '/customers',
  CUSTOMER_DETAILS: '/customers/:id',
  
  // Sales routes
  SALES: '/sales',
  POINT_OF_SALE: '/sales/pos',
  ORDER_MANAGEMENT: '/sales/orders',
  
  // Report routes
  REPORTS: '/reports',
  ANALYTICS: '/reports/analytics',
  FINANCIAL_REPORTS: '/reports/financial',
  
  // Admin routes
  ADMIN: '/admin',
  TENANT_MANAGEMENT: '/admin/tenants',
  USER_MANAGEMENT: '/admin/users',
};

// Role-based route access
export const ROLE_ACCESS = {
  admin: [
    ROUTES.DASHBOARD,
    ROUTES.PRODUCTS,
    ROUTES.PRODUCT_MANAGEMENT,
    ROUTES.INVENTORY,
    ROUTES.CUSTOMERS,
    ROUTES.CUSTOMER_DETAILS,
    ROUTES.SALES,
    ROUTES.POINT_OF_SALE,
    ROUTES.ORDER_MANAGEMENT,
    ROUTES.REPORTS,
    ROUTES.ANALYTICS,
    ROUTES.FINANCIAL_REPORTS,
    ROUTES.ADMIN,
    ROUTES.TENANT_MANAGEMENT,
    ROUTES.USER_MANAGEMENT,
  ],
  manager: [
    ROUTES.DASHBOARD,
    ROUTES.PRODUCTS,
    ROUTES.PRODUCT_MANAGEMENT,
    ROUTES.INVENTORY,
    ROUTES.CUSTOMERS,
    ROUTES.CUSTOMER_DETAILS,
    ROUTES.SALES,
    ROUTES.POINT_OF_SALE,
    ROUTES.ORDER_MANAGEMENT,
    ROUTES.REPORTS,
    ROUTES.ANALYTICS,
    ROUTES.FINANCIAL_REPORTS,
  ],
  executive: [
    ROUTES.DASHBOARD,
    ROUTES.CUSTOMERS,
    ROUTES.CUSTOMER_DETAILS,
    ROUTES.SALES,
    ROUTES.ORDER_MANAGEMENT,
    ROUTES.REPORTS,
  ],
  customer: [
    ROUTES.DASHBOARD,
    ROUTES.PROFILE,
  ],
};

// Navigation menu configuration
export const NAVIGATION_MENU = {
  admin: [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
    { name: 'Products', path: ROUTES.PRODUCTS, icon: 'Package' },
    { name: 'Customers', path: ROUTES.CUSTOMERS, icon: 'Users' },
    { name: 'Sales', path: ROUTES.SALES, icon: 'ShoppingCart' },
    { name: 'Reports', path: ROUTES.REPORTS, icon: 'BarChart3' },
    { name: 'Admin', path: ROUTES.ADMIN, icon: 'Settings' },
  ],
  manager: [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
    { name: 'Products', path: ROUTES.PRODUCTS, icon: 'Package' },
    { name: 'Customers', path: ROUTES.CUSTOMERS, icon: 'Users' },
    { name: 'Sales', path: ROUTES.SALES, icon: 'ShoppingCart' },
    { name: 'Reports', path: ROUTES.REPORTS, icon: 'BarChart3' },
  ],
  executive: [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
    { name: 'Customers', path: ROUTES.CUSTOMERS, icon: 'Users' },
    { name: 'Sales', path: ROUTES.SALES, icon: 'ShoppingCart' },
    { name: 'Reports', path: ROUTES.REPORTS, icon: 'BarChart3' },
  ],
  customer: [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
    { name: 'Profile', path: ROUTES.PROFILE, icon: 'User' },
  ],
};