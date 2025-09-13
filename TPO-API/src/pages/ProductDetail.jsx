import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../Context/CartContext.jsx";
import ProductRow from "./ProductRow";
import { useNavigate } from "react-router-dom";
import useGetProductById from "../hooks/useGetProductById";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useGetProductById(id);
  const { addToCart, setShowCartPopOver } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <div className="container">Producto no encontrado.</div>;

  const inStock = product.stock > 0;
  const max = product.stock;

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <button
        className="back-button"
        style={{
          margin: "0 0 2rem 0",
          background: "#f8f9fa",
          border: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "1rem",
          color: "#2c3e50",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease"
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
          <div className="price">${product.price.toFixed(2)}</div>
          <div
            className="stock"
            style={{ color: inStock ? "green" : "crimson" }}
          >
            {inStock ? `Disponible (${product.stock})` : "Sin stock"}
          </div>
          <div className="desc">{product.description}</div>
          {inStock && (
            <>
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
                className="add-to-cart"
                disabled={qty < 1 || qty > max}
                onClick={() => {
                  addToCart(product, qty);
                  setShowCartPopOver(true);
                }}
              >
                Agregar al carrito
              </button>
            </>
          )}
        </div>
      </div>
      <div style={{ marginTop: "3rem" }}>
        <h2 style={{ 
          fontSize: "1.5rem", 
          color: "#2c3e50", 
          marginBottom: "1.5rem",
          textAlign: "center" 
        }}>
          Productos relacionados
        </h2>
        <ProductRow />
      </div>
    </div>
  );
}
