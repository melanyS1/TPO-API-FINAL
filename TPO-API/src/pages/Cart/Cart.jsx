import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartItems.css";
import { purchaseCart, verifyStock } from "../../services/product-api";
import CartSummary from "../../components/CartSummary/CartSummary";
import { useEffect } from "react";
import CartItem from "../../components/CartItem/CartItem";
import CartEmpty from "../../components/CartEmpty/CartEmpty";


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
