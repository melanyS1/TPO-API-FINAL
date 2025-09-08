import React from 'react';
import ProductCard from '../Products/ProductCard';
import products from '../../services/products.js';
import './ProductCatalog.css';


const ProductCatalog = () => {
    return (
        <div className="product-catalog">
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductCatalog;