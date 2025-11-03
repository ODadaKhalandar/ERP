import React, { useState, useEffect } from 'react';
import { Search, Package, Plus } from 'lucide-react';

const ProductSearch = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products.slice(0, 10));
    }
  }, [searchTerm, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Mock products data
      const mockProducts = [
        {
          id: '1',
          name: 'Urea Fertilizer',
          brand: 'AgroCorp',
          category: 'fertilizer',
          sale_price: 32.00,
          cost_price: 25.50,
          current_stock: 45,
          unit: 'kg',
          description: 'High-quality urea fertilizer for crops'
        },
        {
          id: '2',
          name: 'NPK Complex',
          brand: 'GreenField',
          category: 'fertilizer',
          sale_price: 58.50,
          cost_price: 45.00,
          current_stock: 32,
          unit: 'kg',
          description: 'Balanced NPK fertilizer'
        },
        {
          id: '3',
          name: 'DAP Fertilizer',
          brand: 'CropMaster',
          category: 'fertilizer',
          sale_price: 72.00,
          cost_price: 58.00,
          current_stock: 28,
          unit: 'kg',
          description: 'Diammonium Phosphate fertilizer'
        },
        {
          id: '4',
          name: 'Potash Fertilizer',
          brand: 'AgroPlus',
          category: 'fertilizer',
          sale_price: 45.00,
          cost_price: 36.00,
          current_stock: 15,
          unit: 'kg',
          description: 'Potassium rich fertilizer'
        },
        {
          id: '5',
          name: 'Insecticide Spray',
          brand: 'CropShield',
          category: 'pesticide',
          sale_price: 155.00,
          cost_price: 120.00,
          current_stock: 28,
          unit: 'ml',
          description: 'Effective insect control spray'
        }
      ];
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    onAddToCart({
      ...product,
      quantity: 1
    });
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      {/* Search Input */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Search products by name, brand, or category..."
        />
      </div>

      {/* Products List */}
      <div className="max-h-80 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{product.brand}</span>
                      <span>•</span>
                      <span className="capitalize">{product.category}</span>
                      <span>•</span>
                      <span>Stock: {product.current_stock} {product.unit}</span>
                    </div>
                    <p className="text-sm font-semibold text-green-600">
                      ₹{product.sale_price} / {product.unit}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.current_stock === 0}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            ))}

            {filteredProducts.length === 0 && searchTerm && (
              <div className="text-center py-8">
                <Package className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-gray-500">No products found</p>
                <p className="text-sm text-gray-400">Try different search terms</p>
              </div>
            )}

            {filteredProducts.length === 0 && !searchTerm && (
              <div className="text-center py-8">
                <Package className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-gray-500">No products available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;