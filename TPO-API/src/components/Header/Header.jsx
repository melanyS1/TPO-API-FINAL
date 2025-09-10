import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartPopOver from "../CartPopOver/CartPopOver";
import { useCart } from "../../Context/CartContext";
import { useUser } from "../../Context/UserContext";
import {useSearchProducts} from "../../hooks/useSearchProducts";
import "./Header.css";

const Header = () => {
  const { showCartPopOver, setShowCartPopOver } = useCart();
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const [openCategories, setOpenCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const  { query, productsFound,handleQueryChange } = useSearchProducts();
  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error loading categories:', error));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Referencia para el menú desplegable
  const menuRef = useRef(null);

  // Cerrar el menú cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">TechShop</div>

          <div className="search-bar">
            <input type="text" placeholder="Buscar productos..." value={query} onChange={(e) => handleQueryChange(e.target.value)} />
            <button>🔍</button>
          </div>
          <ul>
            {productsFound.map(product => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>

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
            <li ref={menuRef} style={{ position: "relative", cursor: "pointer" }}>
              <span onClick={() => setOpenCategories(!openCategories)}>
                Productos {openCategories ? "▴" : "▾"}
              </span>
              {openCategories && (
                <ul className="submenu">
                  {/* Opción para ver todos los productos */}
                  <li><Link to="/products" onClick={() => setOpenCategories(false)}>Todos los productos</Link></li>
                  {categories.length > 0 && (
                    <>
                      <li className="submenu-divider"></li>
                      {/* Categorías cargadas dinámicamente del servidor */}
                      {categories.map(category => (
                        <li key={category.id}>
                          <Link 
                            to={`/products/category/${category.id}`}
                            onClick={() => setOpenCategories(false)}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              )}
            </li>
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
