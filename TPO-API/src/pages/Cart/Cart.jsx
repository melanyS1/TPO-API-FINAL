import { useCart } from "../../Context/CartContext";
import "./CartItems.css";
import "./CartSummary.css";
import products from "../../data/products";
import QtyControls from "../../components/QtyControls/QtyControls";


function Cart() {
  const { cart, addToCart, removeFromCart, totalItems } = useCart(); //userCartContext
  console.log(cart);
  const addAllToCart = () => {
    products.forEach((product) => {
      // Si el producto ya está en el carrito, no lo añade de nuevo
      if (!cart.items.some((item) => item.id === product.id)) {
        addToCart(product, 1);
      }
    });
  };

  return (
    <div className="cart-page">
      <div className="cart-items">
        <button onClick={addAllToCart}>
          Agregar todos los productos al carrito
        </button>
        {cart.items.length === 0 ? (
          <>
            <p>No hay productos en el carrito</p>
            <button onClick={() => (window.location.href = "/")}>
              Volver al inicio
            </button>
          </>
        ) : (
          <ul>
            {cart.items.map((item) => (
              <li key={item.id}>
                <div className="item-title">
                  <div className="listed-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <p>{item.name}</p>
                    <button className="delete-btn" onClick={() => removeFromCart(item.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>

                <div className="cart-item-qty">
                  <div className="info-row">
                    <QtyControls
                      qty={item.qty}
                      maxQty={item.stock}
                      onIncrease={() => {addToCart(item, 1)}}
                      onDecrease={() => {addToCart(item, -1)}}
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
          <p>${cart.items
            .reduce((total, item) => total + item.price * item.qty, 0)
            .toFixed(2)}</p>
        </div>
        <div className="summary-row-total">
          <p>Total</p>
          <p>${cart.items
            .reduce((total, item) => total + item.price * item.qty, 0)
            .toFixed(2)}</p>
        </div>
        <hr />
        
      </div>
    </div>
  );
}

export default Cart;
