import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useCart } from "../Context/CartContext.jsx";
import { getProductById } from "../data/products";
import ProductRow from "./ProductRow";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getProductById(id), [id]);
  const { addToCart, setShowCartPopOver } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <div className="container">Producto no encontrado.</div>;

  const inStock = product.stock > 0;
  const max = product.stock;

  return (
    <div>
      <button
        className="container"
        style={{
          margin: "24px 0",
          background: "#eee",
          border: "none",
          padding: "8px 16px",
          borderRadius: 6,
          cursor: "pointer",
        }}
        onClick={() => navigate("..", { relative: "path" })}
      >
        ← Volver a productos
      </button>
      <div className="product-detail-card">
        <div className="product-detail-img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="desc">{product.description}</div>
          <div className="price">${product.price.toFixed(2)}</div>
          <div
            className="stock"
            style={{ color: inStock ? "green" : "crimson" }}
          >
            {inStock ? `Disponible (${product.stock})` : "Sin stock"}
          </div>
          <label className="qty-label">
            Cantidad:&nbsp;
            <input
              type="number"
              min={1}
              max={max}
              value={qty}
              disabled={!inStock}
              onChange={(e) =>
                setQty(Math.max(1, Math.min(Number(e.target.value) || 1, max)))
              }
            />
          </label>
          <button
            disabled={!inStock || qty < 1 || qty > max}
            onClick={() => {
              addToCart(product, qty);
              setShowCartPopOver(true);
            }}
          >
            Agregar al carrito 🛒
          </button>
        </div>
      </div>
      <ProductRow />
    </div>
  );
}
