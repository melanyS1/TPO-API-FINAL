import React from 'react';
import './FeaturedProducts.css';
import products from '../../services/products';

const FeaturedProducts = () => {
  // Get first 4 products to feature
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="featured-products">
      <h2>Productos Destacados</h2>
      <div className="featured-grid">
        {featuredProducts.map((product) => (
          <div key={product.id} className="featured-card">
            <img src={product.image} alt={product.name} />
            <div className="featured-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">${product.price}</span>
              <button className="featured-button">Ver Detalles</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;