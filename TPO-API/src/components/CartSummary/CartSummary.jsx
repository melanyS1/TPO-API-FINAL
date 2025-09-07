import "./CartSummary.css";

function CartSummary({ totalItems, cart, onCheckout }) {
  return (
    <div className="cart-summary">
      <h3>Resumen de compra</h3>
      <hr />
      <div className="summary-row">
        <p>Productos ({totalItems})</p>
        <p>
          $
          {cart.items
            .reduce((total, item) => total + item.price * item.qty, 0)
            .toFixed(2)}
        </p>
      </div>
      <div className="summary-row-total">
        <p>Total</p>
        <p>
          $
          {cart.items
            .reduce((total, item) => total + item.price * item.qty, 0)
            .toFixed(2)}
        </p>
      </div>
      <hr />
      <button className="checkout-btn" onClick={onCheckout}>
        Comprar
      </button>
    </div>
  );
}

export default CartSummary;
