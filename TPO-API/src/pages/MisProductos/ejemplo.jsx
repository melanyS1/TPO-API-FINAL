import React from "react";
import useGetProductsBySeller from "../../hooks/useGetProductsBySeller";

const ProductosDeSeller1 = () => {
  const productos = useGetProductsBySeller(1);

  if (!productos) return <p>Cargando productos...</p>;

  return (
    <div>
      <h2>Productos del vendedor 1</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.name} - ${producto.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductosDeSeller1;