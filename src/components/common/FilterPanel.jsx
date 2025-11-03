import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange, filterConfig }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    if (onFilterChange) {
      onFilterChange({ ...filters, [key]: value });
    }
  };

  const clearFilters = () => {
    const clearedFilters = {};
    filterConfig.forEach(config => {
      clearedFilters[config.key] = config.type === 'checkbox' ? false : '';
    });
    if (onFilterChange) {
      onFilterChange(clearedFilters);
    }
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== false && value !== null && value !== undefined
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-colors ${
          hasActiveFilters 
            ? 'bg-green-100 border-green-300 text-green-700' 
            : 'border-gray-300 hover:bg-gray-50'
        }`}
      >
        <Filter className="w-4 h-4" />
        Filters
        {hasActiveFilters && (
          <span className="bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {Object.values(filters).filter(v => v && v !== '').length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-20 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-4">
              {filterConfig && filterConfig.map((config) => (
                <div key={config.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.label}
                  </label>
                  
                  {config.type === 'select' && (
                    <select
                      value={filters[config.key] || ''}
                      onChange={(e) => handleFilterChange(config.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      {config.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {config.type === 'checkbox' && (
                    <div className="space-y-2">
                      {config.options.map(option => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters[config.key] || false}
                            onChange={(e) => handleFilterChange(config.key, e.target.checked)}
                            className="h-4 w-4 text-green-600 rounded focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterPanel;