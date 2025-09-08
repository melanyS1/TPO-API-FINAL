
import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, setShowCartPopOver } = useCart();
    return (
        <div
            className="product-card"
            style={{ cursor: 'pointer' }}
            onClick={() => window.open(`/products/${product.id}`, '_blank')}
        >
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <button className="add-to-cart"
                    onClick={e => {
                        e.stopPropagation();
                        addToCart(product, 1);
                        setShowCartPopOver(true);
                    }}
                >Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;