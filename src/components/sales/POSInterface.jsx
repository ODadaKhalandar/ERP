import React, { useState } from 'react';
import { ShoppingCart, CreditCard } from 'lucide-react';
import ProductSearch from './ProductSearch';
import SalesCart from './SalesCart';
import CustomerSelector from './CustomerSelector';
import PaymentModal from './PaymentModal';

const POSInterface = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, product];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.sale_price * item.quantity), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = (paymentData) => {
    console.log('Payment completed:', paymentData);
    console.log('Sale data:', {
      customer: selectedCustomer,
      items: cartItems,
      subtotal,
      tax,
      total,
      payment: paymentData
    });
    
    // Clear cart and reset
    setCartItems([]);
    setSelectedCustomer(null);
    setShowPaymentModal(false);
    
    // Show success message
    alert('Sale completed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Point of Sale</h1>
          <p className="text-gray-600">Quick and easy sales transactions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Search & Customer */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Selection */}
            <CustomerSelector
              selectedCustomer={selectedCustomer}
              onSelectCustomer={setSelectedCustomer}
              onAddNewCustomer={() => alert('Open customer form')}
            />

            {/* Product Search */}
            <ProductSearch onAddToCart={addToCart} />
          </div>

          {/* Right Column - Sales Cart */}
          <div className="space-y-6">
            <SalesCart
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
            />

            {/* Checkout Section */}
            {cartItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-medium">{cartItems.length}</span>
                  </div>
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

                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <CreditCard className="w-5 h-5" />
                    Process Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          totalAmount={total}
          customer={selectedCustomer}
          onComplete={handlePaymentComplete}
          onCancel={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default POSInterface;