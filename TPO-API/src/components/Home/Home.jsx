import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-component">
      {/* Quick Links Section */}
      <div className="welcome-section">
        <h1>Welcome to TechStore</h1>
        <p>Discover the Latest in Technology</p>
      </div>

      {/* Categories Section */}
      <div className="categories-section">
        <div className="category-card">
          <i className="fas fa-laptop"></i>
          <h3>Laptops</h3>
          <p>Latest models available</p>
        </div>
        <div className="category-card">
          <i className="fas fa-mobile-alt"></i>
          <h3>Smartphones</h3>
          <p>Top brands and models</p>
        </div>
        <div className="category-card">
          <i className="fas fa-headphones"></i>
          <h3>Accessories</h3>
          <p>Complete your setup</p>
        </div>
      </div>
    </div>
  );
};

export default Home;