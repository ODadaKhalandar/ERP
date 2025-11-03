import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download, Upload, AlertTriangle, Package } from 'lucide-react'; // Added Package import
import { productsAPI } from '../../services/api/products';
import ProductCard from './ProductCard';
import SearchBar from '../common/SearchBar';
import FilterPanel from '../common/FilterPanel';

const ProductList = ({ onAddProduct, onEditProduct, onViewDetails }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    lowStock: false,
    status: 'all'
  });
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // For now, use mock data since we don't have backend connected
      const mockProducts = [
        {
          id: '1',
          name: 'Urea Fertilizer',
          description: 'High-quality urea fertilizer for crops',
          category: 'fertilizer',
          brand: 'AgroCorp',
          cost_price: 25.50,
          sale_price: 32.00,
          current_stock: 45,
          min_stock_alert: 20,
          unit: 'kg',
          hsn_code: '310210'
        },
        {
          id: '2',
          name: 'NPK Complex',
          description: 'Balanced NPK fertilizer',
          category: 'fertilizer',
          brand: 'GreenField',
          cost_price: 45.00,
          sale_price: 58.50,
          current_stock: 12,
          min_stock_alert: 15,
          unit: 'kg',
          hsn_code: '310520'
        },
        {
          id: '3',
          name: 'Insecticide Spray',
          description: 'Effective insect control spray',
          category: 'pesticide',
          brand: 'CropShield',
          cost_price: 120.00,
          sale_price: 155.00,
          current_stock: 28,
          min_stock_alert: 10,
          unit: 'ml',
          hsn_code: '380891'
        }
      ];
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleProductSelect = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockCount = products.filter(product => product.current_stock <= product.min_stock_alert).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <div className="flex gap-3">
          {lowStockCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-700">
                {lowStockCount} low stock items
              </span>
            </div>
          )}
          <button
            onClick={onAddProduct}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search products by name, brand, or description..."
              onSearch={handleSearch}
            />
          </div>
          <div className="flex gap-3">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              filterConfig={[
                {
                  key: 'category',
                  label: 'Category',
                  type: 'select',
                  options: [
                    { value: '', label: 'All Categories' },
                    { value: 'fertilizer', label: 'Fertilizer' },
                    { value: 'pesticide', label: 'Pesticide' },
                    { value: 'herbicide', label: 'Herbicide' },
                    { value: 'fungicide', label: 'Fungicide' },
                    { value: 'growth_regulator', label: 'Growth Regulator' }
                  ]
                },
                {
                  key: 'lowStock',
                  label: 'Stock Status',
                  type: 'checkbox',
                  options: [
                    { value: true, label: 'Low Stock Only' }
                  ]
                }
              ]}
            />
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedProducts.length} products selected
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                  Update Stock
                </button>
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                  Change Status
                </button>
                <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200">
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEditProduct}
              onViewDetails={onViewDetails}
              onSelect={handleProductSelect}
              isSelected={selectedProducts.includes(product.id)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-500">
            {searchTerm || Object.values(filters).some(Boolean) 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first product'
            }
          </p>
          {!searchTerm && !Object.values(filters).some(Boolean) && (
            <button
              onClick={onAddProduct}
              className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;