import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
import useGetProducts from '../../hooks/useGetProducts';
import './ProductCatalog.css';

const ProductCatalog = () => {
    const [searchParams] = useSearchParams();
    const { categoryId } = useParams();
    const searchTerm = searchParams.get('search') || '';
    const products = useGetProducts(searchTerm, categoryId);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (products) {
            setIsLoading(false);
        }
    }, [products]);

    return (
        <div className="product-catalog">
            <div className="products-grid">
                {isLoading ? (
                    <div className="message">Cargando productos...</div>
                ) : products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="message">
                        No se ha encontrado el producto{searchTerm ? ` "${searchTerm}"` : ''}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCatalog;