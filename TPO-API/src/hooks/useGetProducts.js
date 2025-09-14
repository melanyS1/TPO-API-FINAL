import { getProducts } from "../services/product-api";
import { useState, useEffect } from "react";

function useGetProducts(searchTerm = '', categoryId = null) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      let filtered = [...data];
      
      // Filtrar por categoría si se especifica
      if (categoryId) {
        filtered = filtered.filter(product => product.categoryId === categoryId);
      }

      // Filtrar por término de búsqueda si se especifica
      if (searchTerm) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setProducts(filtered);
    });
  }, [searchTerm, categoryId]);

  return products;
}

export default useGetProducts;
