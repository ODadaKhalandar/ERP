import React from 'react';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';

const SalesCart = ({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.sale_price * item.quantity), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Cart is Empty</h3>
        <p className="mt-2 text-gray-500">Add products to start a sale</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Cart Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Sales Cart</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{cartItems.length} items</span>
            <button
              onClick={onClearCart}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  ₹{item.sale_price} × {item.quantity} {item.unit}
                </p>
                <p className="text-sm font-semibold text-green-600">
                  ₹{(item.sale_price * item.quantity).toLocaleString()}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-1 text-gray-600 hover:text-gray-800 disabled:opacity-30"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-2 py-1 text-sm font-medium min-w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 text-gray-600 hover:text-gray-800"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">GST (18%):</span>
            <span className="font-medium">₹{tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
            <span className="text-gray-900">Total:</span>
            <span className="text-green-600">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCart;