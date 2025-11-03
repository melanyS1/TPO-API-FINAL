import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartItems.css";
import { processCheckout, verifyStock, getSessionId } from "../../services/product-api";
import { useRefresh } from "../../Context/RefreshContext";
import CartSummary from "../../components/CartSummary/CartSummary";
import { useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import CartEmpty from "../../components/CartEmpty/CartEmpty";
import { useUser } from "../../Context/UserContext";

function Cart() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const { bumpProductsVersion } = useRefresh();
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
          onCheckout={async () => {
            if (!isAuthenticated) {
              setShowLoginMsg(true);
              return;
            }
            try {
              // Verificación opcional de stock en frontend
              const isStockSufficient = await verifyStock(cart);
              if (!isStockSufficient) {
                alert("Stock insuficiente");
                return;
              }
              // Procesar compra en backend (descuenta stock y vacía carrito en servidor)
              const sessionId = localStorage.getItem('sessionId') || getSessionId();
              await processCheckout(sessionId);
              bumpProductsVersion();
              clearCart();
              navigate("/thank-you");
            } catch (e) {
              alert(e?.message || "Error al procesar la compra");
            }
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
