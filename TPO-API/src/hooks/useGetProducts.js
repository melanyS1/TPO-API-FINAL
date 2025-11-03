import { getProducts } from "../services/product-api";
import { useRefresh } from "../Context/RefreshContext";
import { useState, useEffect } from "react";

function useGetProducts(searchTerm = '', categoryId = null) {
  const [products, setProducts] = useState([]);
  const { productsVersion } = useRefresh();

  useEffect(() => {
    getProducts(categoryId).then((data) => {
      let filtered = [...data];

      // Apply search filter if specified
      if (searchTerm) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setProducts(filtered);
    });
  }, [searchTerm, categoryId, productsVersion]);

  return products;
}

export default useGetProducts;
