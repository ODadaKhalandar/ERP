import React, { useState } from 'react';
import ProductList from '../../components/products/ProductList';
import ProductForm from '../../components/products/ProductForm';

const ProductManagement = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleViewDetails = (product) => {
    // Navigate to product details page
    console.log('View product details:', product);
  };

  const handleSaveProduct = (savedProduct) => {
    setShowProductForm(false);
    setEditingProduct(null);
    // Refresh product list or update state
    console.log('Product saved:', savedProduct);
  };

  const handleCancelForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  return (
    <div>
      <ProductList
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onViewDetails={handleViewDetails}
      />

      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default ProductManagement;