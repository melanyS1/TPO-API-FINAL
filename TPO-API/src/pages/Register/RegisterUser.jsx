import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterUser.css';
import { registerUser } from '../../services/api';


const RegisterUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!form.name || !form.email || !form.password) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      const response = await registerUser(form);
      if (response.success) {
        alert('¡Registro exitoso! Ya puedes iniciar sesión');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError(error.message || 'Error al registrar usuario');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <h1>Ingresá tus datos para crear tu cuenta</h1>
          <p className="help-link">Necesito ayuda</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Registro de Usuario</h2>
          {error && <div className="error-message">{error}</div>}
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
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
            minLength="3"
          />
          <button type="submit">Registrarse</button>

          <p className="login-text">
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="login-link">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
