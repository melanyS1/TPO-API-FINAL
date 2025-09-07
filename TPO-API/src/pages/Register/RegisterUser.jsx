import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterUser.css';
import { registerUser } from '../../services/api';


const RegisterUser = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(form);
      console.log('Usuario registrado:', response);
      alert('Registro exitoso'); 
      setForm({ name: '', email: '', password: '' }); 
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario');
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
