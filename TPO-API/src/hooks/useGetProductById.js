import { getProductById } from "../services/product-api";
import { useState, useEffect } from "react";

function useGetProductById(id) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  return product;
}

export default useGetProductById;
