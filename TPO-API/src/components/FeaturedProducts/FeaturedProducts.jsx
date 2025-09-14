import React from 'react';
import './FeaturedProducts.css';
import useGetProducts from '../../hooks/useGetProducts';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const products = useGetProducts();
  // Filtrar destacados y mezclar aleatoriamente
  const getRandomFeatured = (arr, n) => {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };
  const featuredProducts = products && products.length > 0 ? getRandomFeatured(products.filter(p => p.featured), 6) : [];
  const navigate = useNavigate();

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
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                  <button
                    className="featured-button"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    Ver Detalles
                  </button>
                </div>
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