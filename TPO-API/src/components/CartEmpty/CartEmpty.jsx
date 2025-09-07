import { Link } from "react-router-dom";
import "./CartEmpty.css";
import emptyCartImg from "../../assets/empty-cart.svg";

function CartEmpty() {
  return (
    <div className="empty-cart">
      <img src={emptyCartImg} alt="Carrito vacío" className="empty-cart-img" />
      <p>No hay productos en el carrito</p>
      <Link to="/" className="empty-cart-btn"> 
        ¡Descubrí productos!
      </Link>
    </div>
  );
}

export default CartEmpty;
