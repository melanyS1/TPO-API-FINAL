import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartItems.css";
import { purchaseCart, verifyStock } from "../../services/product-api";
import CartSummary from "../../components/CartSummary/CartSummary";
import { useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import CartEmpty from "../../components/CartEmpty/CartEmpty";
import { useUser } from "../../Context/UserContext";

function Cart() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const {
    cart,
    addToCart,
    removeFromCart,
    totalItems,
    clearCart,
    setShowCartPopOver,
  } = useCart();
  const [showLoginMsg, setShowLoginMsg] = useState(false);

  useEffect(() => {
    setShowCartPopOver(false);
  }, [setShowCartPopOver]);

  return (
    <div className="cart-page">
      <div className="cart-items">
        {cart.items.length === 0 ? (
          <CartEmpty />
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

      <div className="cart-summary-section">
        <CartSummary
          totalItems={totalItems}
          cart={cart}
          onCheckout={() => {
            if (!isAuthenticated) {
              setShowLoginMsg(true);
              return;
            }
            verifyStock(cart).then((isStockSufficient) => {
              if (!isStockSufficient) {
                alert("Stock insuficiente");
                return;
              } else {
                navigate("/thank-you");
                purchaseCart(cart);
                clearCart();
              }
            });
          }}
        />
        <div className="cart-login-message">
          <p>
            {showLoginMsg
              ? "Debes iniciar sesión para continuar con la compra."
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
