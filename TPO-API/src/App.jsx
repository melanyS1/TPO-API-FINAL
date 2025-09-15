import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginUser from "./pages/Login/LoginUser";
import RegisterUser from "./pages/Register/RegisterUser";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import { CartProvider } from "./Context/CartContext";
import { UserProvider } from "./Context/UserContext";
import ProductDetail from "./pages/ProductDetail";
import ThankYouPage from "./pages/ThankYouPage/ThankYouPage";
import Products from "./pages/Products/Products";
import MisProductos from "./pages/MisProductos/misProductos";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />  
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<LoginUser />} />
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/category/:categoryId" element={<Products />} /> 
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/mis-productos" element={<MisProductos />} />
              <Route path="/cart" 
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
            </Routes>
          </main>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
