
import React from "react";
import "./CartPopOver.css";
import { useCart } from "../../Context/CartContext";
import { Link } from "react-router-dom";

function CartPopOver({ onClose }) {
  const { cart } = useCart();

  if (!cart.items.length) return null;

  return (
    <div className="cart-popover">
      <div className="cart-popover-header">
        <span>Productos en el carrito</span>
        <button className="close-btn" onClick={onClose}>&times;</button>
      </div>
      <ul className="cart-popover-list">
        {cart.items.map((item) => (
          <li key={item.id} className="cart-popover-item">
            <img src={item.image} alt={item.name} className="cart-popover-img" />
            <div>
              <Link to={`/product/${item.id}`}>{item.name}</Link>
              <div className="cart-popover-qty">Cantidad: {item.qty}</div>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/cart" className="cart-popover-link">Ir al carrito</Link>
    </div>
  );
}

export default CartPopOver;