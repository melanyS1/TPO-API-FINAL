import { useCart } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./CartItems.css";
import "./CartSummary.css";
import QtyControls from "../../components/QtyControls/QtyControls";
import { purchaseCart, verifyStock } from "../../services/product-api";
import emptyCartImg from "../../assets/empty-cart.svg";

function Cart() {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, totalItems, clearCart } = useCart(); //userCartContext

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
              <li key={item.id}>
                <div className="item-title">
                  <div className="listed-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <p>
                      <Link
                        to={`/producto/${item.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          cursor: "pointer",
                        }}
                      >
                        {item.name}
                      </Link>
                    </p>
                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <div className="cart-item-qty">
                  <div className="info-row">
                    <QtyControls
                      qty={item.qty}
                      maxQty={item.stock}
                      onIncrease={() => {
                        addToCart(item, 1);
                      }}
                      onDecrease={() => {
                        addToCart(item, -1);
                      }}
                    />
                    <div className="item-subtotal">
                      <p>${item.price}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

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
        <button
          className="checkout-btn"
          onClick={() => {
            if (verifyStock(cart)) {
              purchaseCart(cart);
              navigate("/thank-you");
              clearCart();

            } else {
              alert("Stock insuficiente");
            }
          }}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

export default Cart;
