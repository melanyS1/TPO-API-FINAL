import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = ({ results, visible, onResultClick }) => {
  if (!visible || !results.length) return null;

  return (
    <div className="search-results">
      {results.map(product => (
        <Link 
          key={product.id} 
          to={`/product/${product.id}`}
          className="search-result-item"
          onClick={() => onResultClick()}
        >
          <div className="search-result-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="search-result-info">
            <h4>{product.name}</h4>
            <p className="search-result-price">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
