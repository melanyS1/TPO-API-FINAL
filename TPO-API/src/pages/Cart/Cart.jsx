import { useCart } from "../../Context/CartContext";
import "./Cart.css";

function Cart() {
  const {cart, addToCart, removeFromCart, totalItems} = useCart(); //userCartContext
  console.log(cart);

  return <div className="cart-page">
    
    <div className="cart-items">
      {cart.items.length == 0 ? (
        <>
        <p>No hay productos en el carrito</p>
        <button onClick={() => window.location.href = "/"}>Volver al inicio</button>
        </>
      ) : (
        <ul>
          {cart.items.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.qty}
              <button onClick={() => addToCart(item, 1)}>+</button>
              <button onClick={() => addToCart(item, -1)} disabled={item.qty <= 1}>-</button>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              <p>Cantidad disponible: {item.stock}</p>
            </li>
          ))} 
        </ul>
      )}
    </div>

    <div className="cart-summary">
      <h1>Resumen de compra</h1>
      <p>Productos: {totalItems}</p>
      <p>Total: {
        cart.items.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)
        }</p>
    </div>

  </div>;
}

export default Cart;