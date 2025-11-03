import React, { useState } from 'react';
import { X, CreditCard, Wallet, Smartphone, CheckCircle } from 'lucide-react';

const PaymentModal = ({ totalAmount, customer, onComplete, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [amountReceived, setAmountReceived] = useState(totalAmount);
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateChange = () => {
    return amountReceived - totalAmount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const paymentData = {
        method: paymentMethod,
        amountReceived: parseFloat(amountReceived),
        change: calculateChange(),
        transactionId: `TXN${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      onComplete(paymentData);
      setIsProcessing(false);
    }, 2000);
  };

  const paymentMethods = [
    { id: 'cash', name: 'Cash', icon: Wallet, color: 'text-green-600' },
    { id: 'card', name: 'Card', icon: CreditCard, color: 'text-blue-600' },
    { id: 'upi', name: 'UPI', icon: Smartphone, color: 'text-purple-600' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Process Payment</h2>
            <p className="text-gray-600">Complete the sale transaction</p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Info */}
        {customer && customer.id !== 'walkin' && (
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <div className="text-sm">
              <span className="text-blue-700 font-medium">Customer:</span>
              <span className="text-blue-800 ml-2">{customer.name}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Total Amount */}
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{totalAmount.toLocaleString()}
            </p>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    paymentMethod === method.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <method.icon className={`w-6 h-6 mx-auto mb-2 ${method.color}`} />
                  <span className="text-sm font-medium text-gray-700">{method.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Received (for cash payments) */}
          {paymentMethod === 'cash' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Received
              </label>
              <input
                type="number"
                step="0.01"
                value={amountReceived}
                onChange={(e) => setAmountReceived(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter amount received"
              />
              {calculateChange() > 0 && (
                <p className="mt-2 text-sm text-green-600">
                  Change: ₹{calculateChange().toLocaleString()}
                </p>
              )}
              {calculateChange() < 0 && (
                <p className="mt-2 text-sm text-red-600">
                  Insufficient amount received
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || (paymentMethod === 'cash' && calculateChange() < 0)}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Complete Sale
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;