import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginUser from "./pages/Login/LoginUser";
import RegisterUser from "./pages/Register/RegisterUser";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import { CartProvider } from "./Context/CartContext";
import ProductDetail from "./pages/ProductDetail";
import ThankYouPage from "./pages/ThankYouPage/ThankYouPage";


function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
