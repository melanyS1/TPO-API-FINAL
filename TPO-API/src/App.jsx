import { useState } from "react";
import products, { getProductById } from "./data/products";
import { useCart } from "./Context/CartContext";
import "./index.css";

function HeaderLite() {
  const username = "lucia"; 

  return (
    <header style={{ background: "#222", color: "#fff", padding: "12px 0 0 0" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <span style={{ fontWeight: 700, fontSize: 24 }}>TechShop</span>
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
        <div style={{ marginLeft: "auto", fontWeight: 500, fontSize: 18 }}>
          {username}
        </div>
      </div>
      <nav className="container" style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 8 }}>
        <span style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}>Inicio</span>
        <span style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}>Productos</span>
        <span style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}>Ofertas</span>
        <span style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}>Contacto</span>
      </nav>
    </header>
  );
}

function ProductList({ onSelect }) {
  return (
    <div className="container" style={{ marginTop: 32 }}>
      <h2>Productos</h2>
      <div style={{ display: "flex", gap: 32 }}>
        {products.map(prod => (
          <div key={prod.id} style={{ background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001", padding: 16, textAlign: "center" }}>
            <img src={prod.image} alt={prod.name} style={{ width: 180, borderRadius: 6 }} />
            <div style={{ fontWeight: 600, margin: "12px 0 8px", fontSize: 16 }}>{prod.name}</div>
            <div style={{ color: "#b12704", fontWeight: 700, fontSize: 18 }}>${prod.price.toFixed(2)}</div>
            <button onClick={() => onSelect(prod.id)} style={{ marginTop: 8, background: "#ffd814", border: 0, borderRadius: 6, padding: "8px 16px", fontWeight: 700, cursor: "pointer" }}>
              Ver detalle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetail({ productId }) {
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <div className="container">Producto no encontrado.</div>;

  const inStock = product.stock > 0;
  const max = product.stock;

  return (
    <div className="container">
      <div className="product-detail-card">
        <div className="product-detail-img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="desc">{product.description}</div>
          <div className="price">${product.price.toFixed(2)}</div>
          <div className="stock" style={{ color: inStock ? "green" : "crimson" }}>
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
              onChange={(e) => setQty(Math.max(1, Math.min(Number(e.target.value) || 1, max)))}
            />
          </label>
          <button
            disabled={!inStock || qty < 1 || qty > max}
            onClick={() => { addToCart(product, qty); }}
          >
            Agregar al carrito 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

function FeaturedProduct({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return null;
  const inStock = product.stock > 0;
  const max = product.stock;

  return (
    <div className="container" style={{ marginTop: 32 }}>
      <div className="product-detail-card" style={{ marginTop: 0 }}>
        <div className="product-detail-img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="desc">{product.description}</div>
          <div className="price">${product.price.toFixed(2)}</div>
          <label className="qty-label">
            Cantidad:&nbsp;
            <input
              type="number"
              min={1}
              max={max}
              value={qty}
              disabled={!inStock}
              onChange={e => setQty(Math.max(1, Math.min(Number(e.target.value) || 1, max)))}
            />
          </label>
          <button
            disabled={!inStock || qty < 1 || qty > max}
            onClick={() => addToCart(product, qty)}
            style={{
              background: "#ffd814",
              color: "#222",
              fontWeight: 700,
              padding: "10px 18px",
              border: 0,
              borderRadius: 6,
              fontSize: 16,
              cursor: inStock ? "pointer" : "not-allowed",
              marginTop: 12
            }}
          >
            Agregar al carrito 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedId, setSelectedId] = useState(null);

  // Elige el producto principal (el primero de la lista)
  const featured = products[0];

  return (
    <>
      <HeaderLite />
      {!selectedId ? (
        <>
          <FeaturedProduct product={featured} onSelect={setSelectedId} />
          <ProductList onSelect={setSelectedId} />
        </>
      ) : (
        <>
          <button className="container" style={{ margin: "24px 0", background: "#eee", border: "none", padding: "8px 16px", borderRadius: 6, cursor: "pointer" }} onClick={() => setSelectedId(null)}>
            ← Volver a productos
          </button>
          <ProductDetail productId={selectedId} />
        </>
      )}
    </>
  );
}

export default App;
