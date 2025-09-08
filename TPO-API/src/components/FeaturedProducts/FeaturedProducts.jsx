import React from 'react';
import './FeaturedProducts.css';
import useGetProducts from '../../hooks/useGetProducts';

const FeaturedProducts = () => {
  const products = useGetProducts();
  const featuredProducts = products && products.length > 0 ? products.slice(0, 4) : [];

  return (
    <section className="featured-products">
      <h2>Productos Destacados</h2>
      <div className="featured-grid">
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product) => (
            <div key={product.id} className="featured-card">
              <img src={product.image} alt={product.name} />
              <div className="featured-content">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className="price">${product.price}</span>
                <button
                  className="featured-button"
                  onClick={() => window.open(`/products/${product.id}`, '_blank')}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>Cargando productos...</div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;