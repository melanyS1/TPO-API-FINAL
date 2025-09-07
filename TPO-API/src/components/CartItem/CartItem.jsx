import "./CartItem.css";
import { Link } from "react-router-dom";
import QtyControls from "../QtyControls/QtyControls";

function CartItem({ item, addToCart, removeFromCart }) {
  return (
      <li className="cart-item" key={item.id}>
        <div className="item-title">
          <div className="listed-item-img">
            <img src={item.image} alt={item.name} />
          </div>
          <div>
            <p>
              <Link
                to={`/products/${item.id}`}
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
  );
}

export default CartItem;
