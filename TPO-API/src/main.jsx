import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./index.css";
import { CartProvider, useCart } from "./Context/CartContext.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

// Genera un nombre de usuario random
function getRandomUser() {
  const names = ["Melisa", "Juan", "Sofi", "Alex", "Leo", "Vale", "Fran", "Cami"];
  return names[Math.floor(Math.random() * names.length)];
}

function HeaderLite() {
  const { totalItems } = useCart();
  const username = getRandomUser();

  return (
    <header style={{ background: "#222", color: "#fff", padding: "12px 0" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 24 }}>
          TechShop
        </Link>
        <input
          type="text"
          placeholder="Buscar productos..."
          style={{
            marginLeft: 24,
            flex: 1,
            maxWidth: 400,
            padding: "8px 12px",
            borderRadius: 4,
            border: "1px solid #ccc",
            fontSize: 16
          }}
        />
        <button
          style={{
            background: "#2196f3",
            border: "none",
            borderRadius: "0 4px 4px 0",
            padding: "8px 12px",
            marginLeft: -4,
            cursor: "pointer"
          }}
        >
          <span role="img" aria-label="buscar">🔍</span>
        </button>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontWeight: 500 }}>{username}</span>
          <span style={{ fontSize: 22 }}>🛒 {totalItems}</span>
        </div>
      </div>
      <nav className="container" style={{ display: "flex", gap: 32, marginTop: 8, justifyContent: "center" }}>
        <Link to="/" style={{ color: "#fff", fontWeight: 500 }}>Inicio</Link>
        <Link to="/producto/1" style={{ color: "#fff", fontWeight: 500 }}>Productos</Link>
        <span style={{ color: "#fff", fontWeight: 500 }}>Ofertas</span>
        <span style={{ color: "#fff", fontWeight: 500 }}>Contacto</span>
      </nav>
    </header>
  );
}

function Root() {
  return (
    <CartProvider>
      <BrowserRouter>
        <HeaderLite />
        <Routes>
          <Route path="/" element={<ProductDetail />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);

