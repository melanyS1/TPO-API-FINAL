import { getProducts } from "../services/product-api";
import { useState, useEffect } from "react";

function useGetProducts(searchTerm = '', categoryId = null) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Fetching products with categoryId:', categoryId);
    getProducts(categoryId).then((data) => {
      console.log('Raw data from API:', data);
      let filtered = [...data];
      
      // Log the filtering process
      console.log('Filtering products...');
      console.log('Search term:', searchTerm);
      console.log('Category ID:', categoryId);
      
      // Apply search filter if specified
      if (searchTerm) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log('Products after search filter:', filtered.length);
      }

      console.log('Filtered products:', filtered);
      setProducts(filtered);
    });
  }, [searchTerm, categoryId]);

  return products;
}

export default useGetProducts;
