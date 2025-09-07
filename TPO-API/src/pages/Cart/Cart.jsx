import { useCart } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./CartItems.css";
import "./CartSummary.css";
import QtyControls from "../../components/QtyControls/QtyControls";
import { purchaseCart, verifyStock } from "../../services/product-api";
import emptyCartImg from "../../assets/empty-cart.svg";
import CartSummary from "../../components/CartSummary/CartSummary";
import { useEffect } from "react";
import CartItem from "../../components/CartItem/CartItem";


function Cart() {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, totalItems, clearCart, setShowCartPopOver } = useCart();

  useEffect(() => {
    setShowCartPopOver(false);
  }, [setShowCartPopOver]);

  return (
    <div className="cart-page">
      <div className="cart-items">
        {cart.items.length === 0 ? (
          <div className="empty-cart">
            <img src={emptyCartImg} alt="Carrito vacío" className="empty-cart-img" />
            <p>No hay productos en el carrito</p>
            <Link to="/" className="empty-cart-btn"> 
              ¡Descubrí productos!
            </Link>
          </div>
        ) : (
          <ul>
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))}
          </ul>
        )}
      </div>

      <CartSummary
        totalItems={totalItems}
        cart={cart}
        onCheckout={() => {
          if (verifyStock(cart)) {
            purchaseCart(cart);
            navigate("/thank-you");
            clearCart();
          } else {
            alert("Stock insuficiente");
          }
        }}
      />
    </div>
  );
}

export default Cart;
