import { useState, useEffect } from "react";
import { updateProductById } from "../services/crud-products";

function useUpdateProductById(id, updatedData, shouldUpdate) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!id || !shouldUpdate) return;

    updateProductById(id, updatedData)
      .then((data) => {
        setResult({ success: true, data });
      })
      .catch((err) => {
        setResult({ success: false, error: err });
      });
  }, [id, updatedData, shouldUpdate]);

  return result;
}

export { useUpdateProductById };
