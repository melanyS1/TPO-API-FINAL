import { getProducts } from "../services/product-api";
import { useState, useEffect } from "react";

function useGetProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return products;
}

export default useGetProducts;
