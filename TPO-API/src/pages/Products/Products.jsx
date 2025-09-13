import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCatalog from '../../components/ProductCatalog/ProductCatalog';
import './Products.css';

const Products = () => {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (categoryId) {
      // Obtener el nombre de la categoría del servidor
      fetch(`http://localhost:3001/categories/${categoryId}`)
        .then(response => response.json())
        .then(category => {
          setCategoryName(category.name);
        })
        .catch(error => console.error('Error loading category:', error));
    }
  }, [categoryId]);

  return (
    <div className="products-page">
      <h1>
        {categoryId 
          ? `Productos - ${categoryName}`
          : 'Todos los Productos'
        }
      </h1>
      <ProductCatalog />
    </div>
  );
};

export default Products;