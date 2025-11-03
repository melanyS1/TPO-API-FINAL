import { useState, useEffect } from "react";
import { api } from "../services/api";
import { useRefresh } from "../Context/RefreshContext";

function useGetProductById(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { productsVersion } = useRefresh();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    
    async function fetchProduct() {
      try {
        const data = await api.get(`/api/products/${id}`);
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
  }, [id, productsVersion]);

  return { product, loading, error };
}

export default useGetProductById;
