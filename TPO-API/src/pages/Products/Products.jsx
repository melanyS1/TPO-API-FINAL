import React from 'react';
import ProductCatalog from '../../components/ProductCatalog/ProductCatalog';
import './Products.css';

const Products = () => {
  return (
    <div className="products-page">
      <h1>Productos</h1>
      <ProductCatalog />
    </div>
  );
};

export default Products;