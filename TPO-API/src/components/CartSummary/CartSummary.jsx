

import { useShippingCost } from "../../hooks/useShippingCost";
import "./CartSummary.css";

function CartSummary({ totalItems, cart, onCheckout }) {
  const shipping = useShippingCost(cart);
  const hasItems = cart.items && cart.items.length > 0;
  const subtotal = hasItems ? cart.items.reduce((total, item) => total + item.price * item.qty, 0) : 0;
  // Solo sumar el shipping si hay productos
  const total = hasItems ? subtotal + shipping.amount : 0;
  return (
    <div className="cart-summary">
      <h3>Resumen de compra</h3>
      <hr />
      <div className="summary-row">
        <p>Productos ({totalItems})</p>
        <p>${subtotal.toFixed(2)}</p>
      </div>
      <div className="summary-row">
        <p>Envío</p>
        <p>{!hasItems ? "—" : (shipping.isFree ? "Gratis" : `$${shipping.amount.toFixed(2)}`)}</p>
      </div>
      <div className="summary-row-total">
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </div>
      <hr />
      <button
        className="checkout-btn"
        onClick={onCheckout}
        disabled={!hasItems}
      >
        Comprar
      </button>
    </div>
  );
}

export default CartSummary;
