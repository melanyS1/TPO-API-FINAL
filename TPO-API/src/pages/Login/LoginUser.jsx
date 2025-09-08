import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginUser.css";
import { useUser } from "../../Context/UserContext";

const LoginUser = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      const result = await login(form.email, form.password);
      
      if (result.success) {
        setForm({ email: "", password: "" });
        navigate("/");
      } else {
        setError(result.error);
        console.error("Error en login:", result.error);
      }
    } catch (error) {
      const errorMessage = error.message || "Error al intentar iniciar sesión";
      setError(errorMessage);
      console.error("Error en login:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h1>Ingresá tu e-mail para iniciar sesión</h1>
          <p className="help-link">Necesito ayuda</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Ingresar</button>

          <button type="button" className="google-btn">
            Iniciar con Google
          </button>

          <p className="register-text">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="register-link">
              Registrarte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
