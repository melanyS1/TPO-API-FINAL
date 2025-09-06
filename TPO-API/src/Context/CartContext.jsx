import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addToCart = (product, qty) => {
    const exist = items.find(i => i.id === product.id);
    if (exist) {
      setItems(items.map(i =>
        i.id === product.id
          ? { ...i, qty: Math.min(i.qty + qty, product.stock) }
          : i
      ));
    } else {
      setItems([...items, { ...product, qty: Math.min(qty, product.stock) }]);
    }
  };
  const totalItems = items.reduce((a, i) => a + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart: { items }, totalItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

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
