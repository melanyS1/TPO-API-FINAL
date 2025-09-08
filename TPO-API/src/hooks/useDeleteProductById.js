import { useState, useEffect } from "react";
import { deleteProductById } from "../services/crud-products";

function useDeleteProductById(id,shouldDelete) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!id || !shouldDelete) return;

    deleteProductById(id)
      .then(() => {
        setResult({ success: true });
      })
      .catch((err) => {
        setResult({ success: false, error: err });
      });
  }, [id, shouldDelete]);

  return result;
}

export { useDeleteProductById };
