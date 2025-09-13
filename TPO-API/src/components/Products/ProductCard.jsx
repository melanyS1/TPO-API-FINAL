
import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    return (
        <div
            className="product-card"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/products/${product.id}`)}
        >
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <button 
                    className="add-to-cart"
                    onClick={e => {
                        e.stopPropagation();
                        navigate(`/products/${product.id}`);
                    }}
                >
                    Ver Detalle
                </button>
            </div>
        </div>
    );
};

export default ProductCard;