import { getProductsbySeller } from "../services/crud-products";
import { useState, useEffect } from "react";

function useGetProductsBySeller(sellerId) {
    const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductsbySeller(sellerId).then((data) => {
      setProduct(data);
    });
  }, [sellerId]);

  return product;
}

export default useGetProductsBySeller;