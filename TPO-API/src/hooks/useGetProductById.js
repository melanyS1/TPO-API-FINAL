import { useState, useEffect } from "react";
import { api } from "../services/api";

function useGetProductById(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    
    async function fetchProduct() {
      try {
        const data = await api.get(`/products/${id}`);
        if (isMounted) {
          setProduct(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching product:', err);
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { product, loading, error };
}

export default useGetProductById;
