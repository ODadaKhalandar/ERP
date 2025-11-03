import React from 'react';
import { Edit, Eye, User, Phone, Mail, MapPin, IndianRupee, AlertTriangle } from 'lucide-react';

const CustomerCard = ({ customer, onEdit, onViewDetails, onSelect, isSelected }) => {
  const hasOutstandingBalance = customer.outstanding_balance > 0;

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 ${
      isSelected ? 'border-green-500' : 'border-gray-200'
    } hover:shadow-md transition-all duration-200 overflow-hidden`}>
      {/* Selection Checkbox */}
      <div className="p-3 border-b border-gray-100">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect && onSelect(customer.id, e.target.checked)}
          className="h-4 w-4 text-green-600 rounded"
        />
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{customer.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  customer.is_active ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="text-xs text-gray-500 capitalize">
                  {customer.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
          {hasOutstandingBalance && (
            <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{customer.phone}</span>
          </div>
          
          {customer.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 truncate">{customer.email}</span>
            </div>
          )}

          {customer.address && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 line-clamp-2">{customer.address}</span>
            </div>
          )}

          {customer.gst_number && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">GST:</span>
              <span className="font-medium">{customer.gst_number}</span>
            </div>
          )}
        </div>

        {/* Financial Information */}
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Total Purchases</p>
            <p className="font-semibold text-green-600">
              ₹{customer.total_purchases?.toLocaleString() || '0'}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Outstanding</p>
            <p className={`font-semibold ${
              hasOutstandingBalance ? 'text-orange-600' : 'text-gray-600'
            }`}>
              ₹{customer.outstanding_balance?.toLocaleString() || '0'}
            </p>
          </div>
        </div>

        {/* Last Order */}
        {customer.last_order_date && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Last order: {new Date(customer.last_order_date).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onViewDetails && onViewDetails(customer)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => onEdit && onEdit(customer)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Outstanding Balance Warning */}
      {hasOutstandingBalance && (
        <div className="bg-orange-50 border-t border-orange-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-orange-700 font-medium">
              Outstanding: ₹{customer.outstanding_balance.toLocaleString()}
            </p>
            <button className="text-xs text-orange-600 hover:text-orange-800 font-medium">
              Collect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCard;