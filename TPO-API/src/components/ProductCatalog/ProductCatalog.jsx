import React from 'react';
import ProductCard from '../Products/ProductCard';
import useGetProducts from '../../hooks/useGetProducts';
import './ProductCatalog.css';

const ProductCatalog = () => {
    const products = useGetProducts();
    return (
        <div className="product-catalog">
            <div className="products-grid">
                {products && products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div>Cargando productos...</div>
                )}
            </div>
        </div>
    );
};

export default ProductCatalog;