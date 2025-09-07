import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CartPopOver from "../CartPopOver/CartPopOver";
import { useCart } from "../../Context/CartContext";
import { useUser } from "../../Context/UserContext";
import "./Header.css";

const Header = () => {
  const { showCartPopOver, setShowCartPopOver } = useCart();
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
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
            {isAuthenticated ? (
              <>
                <span className="user-name">Hola, {user.username || user.email}</span>
                <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link to="/login" className="user-link">Iniciar Sesión</Link>
                <span style={{ margin: "0 5px" }}>/</span>
                <Link to="/register" className="user-link">Registrarme</Link>
              </>
            )}
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
