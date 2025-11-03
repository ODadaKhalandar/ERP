import React from 'react';
import { Edit, Eye, Package, AlertTriangle } from 'lucide-react';

const ProductCard = ({ product, onEdit, onViewDetails, onSelect, isSelected }) => {
  const isLowStock = product.current_stock <= product.min_stock_alert;
  const profitMargin = product.cost_price ? ((product.sale_price - product.cost_price) / product.cost_price * 100).toFixed(1) : 0;

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 ${
      isSelected ? 'border-green-500' : 'border-gray-200'
    } hover:shadow-md transition-all duration-200 overflow-hidden`}>
      {/* Selection Checkbox */}
      <div className="p-3 border-b border-gray-100">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect && onSelect(product.id, e.target.checked)}
          className="h-4 w-4 text-green-600 rounded"
        />
      </div>

      {/* Product Image/Icon */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{product.category}</p>
            </div>
          </div>
          {isLowStock && (
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Brand:</span>
            <span className="font-medium">{product.brand || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Stock:</span>
            <span className={`font-medium ${
              isLowStock ? 'text-red-600' : 'text-gray-900'
            }`}>
              {product.current_stock} {product.unit}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cost Price:</span>
            <span className="font-medium">₹{product.cost_price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sale Price:</span>
            <span className="font-medium text-green-600">₹{product.sale_price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Margin:</span>
            <span className={`font-medium ${
              profitMargin > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {profitMargin}%
            </span>
          </div>
          {product.hsn_code && (
            <div className="flex justify-between">
              <span className="text-gray-600">HSN Code:</span>
              <span className="font-medium">{product.hsn_code}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onViewDetails && onViewDetails(product)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => onEdit && onEdit(product)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Low Stock Warning */}
      {isLowStock && (
        <div className="bg-red-50 border-t border-red-200 px-4 py-2">
          <p className="text-xs text-red-700 font-medium">
            Low stock! Reorder point: {product.min_stock_alert}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;