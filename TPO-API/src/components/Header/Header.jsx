import React from "react";
import { Link } from "react-router-dom";
import CartPopOver from "../CartPopOver/CartPopOver";
import { useCart } from "../../Context/CartContext";
import "./Header.css";

const Header = () => {
  const { showCartPopOver, setShowCartPopOver } = useCart();
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">TechShop</div>

          <div className="search-bar">
            <input type="text" placeholder="Buscar productos..." />
            <button>🔍</button>
          </div>

          <div className="actions">
            <Link to="/login" className="user-link">Iniciar Sesión</Link>
            <span style={{ margin: "0 5px" }}>/</span>
            <Link to="/register" className="user-link">Registrarme</Link>
            <Link to="/cart" className="cart-icon">🛒</Link>
          </div>
        </div>

        <nav className="nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/offers">Ofertas</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
          </ul>
        </nav>
      </header>
      {showCartPopOver && (
        <CartPopOver onClose={() => setShowCartPopOver(false)} />
      )}
    </>
  );
};

export default Header;
