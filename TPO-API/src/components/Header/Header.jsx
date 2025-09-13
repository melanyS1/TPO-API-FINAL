import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import CartPopOver from "../CartPopOver/CartPopOver";
import SearchResults from "../SearchResults/SearchResults";
import { useCart } from "../../Context/CartContext";
import { useUser } from "../../Context/UserContext";
import useGetProducts from "../../hooks/useGetProducts";
import "./Header.css";

const Header = () => {
  const { showCartPopOver, setShowCartPopOver } = useCart();
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const [openCategories, setOpenCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const products = useGetProducts(searchTerm);

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

  // Cerrar el menú y resultados cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenCategories(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };
  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">TechShop</Link>

          <div className="search-container" ref={searchRef}>
            <form className="search-bar" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
              />
              <button type="submit">
                <BiSearch size={20} />
              </button>
            </form>
            <SearchResults 
              results={products.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              visible={showResults && searchTerm.length > 0}
              onResultClick={() => {
                setShowResults(false);
                setSearchTerm('');
              }}
            />
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
