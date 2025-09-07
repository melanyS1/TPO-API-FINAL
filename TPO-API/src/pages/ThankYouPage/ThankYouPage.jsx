
import "./ThankYouPage.css";
import checkedImg from "../../assets/checked.png";
import { useNavigate } from "react-router-dom";

function ThankYouPage() {
  const navigate = useNavigate();
  return (
    <div className="thankyou-container">
      <img src={checkedImg} alt="Compra exitosa" className="checked-img" />
      <p className="thankyou-p">¡Gracias por tu compra!</p>
      <p>Tu pedido ha sido procesado con éxito.</p>
      <button className="home-btn" onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
}

export default ThankYouPage;
