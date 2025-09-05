import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginUser.css";
import { loginUser } from "../../services/api.js";

const LoginUser = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(form);
      console.log("Login exitoso:", response);
      alert("Bienvenido " + response.user.email);
      setForm({ email: "", password: "" });
    } catch (error) {
      console.error("Error en login:", error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h1>Ingresá tu e-mail o teléfono para iniciar sesión</h1>
          <p className="help-link">Necesito ayuda</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
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
