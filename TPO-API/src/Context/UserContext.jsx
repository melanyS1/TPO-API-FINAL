import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = async (email, password) => {
    try {
      console.log('Attempting login for:', email);
      console.log('Request payload:', { email, password });
      
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      
      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response body:', responseText);
      
      if (!response.ok) {
        if (response.status === 400) {
          return { success: false, error: 'Email o contraseña incorrectos: ' + responseText };
        }
        console.error('Server response not ok:', response.status, response.statusText);
        return { success: false, error: 'Error de conexión con el servidor: ' + responseText };
      }

      // We already have the token in responseText
      const token = responseText;
      
      // Get the user details using the token
      const userResponse = await fetch('http://localhost:8080/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!userResponse.ok) {
        console.error('Error getting user details:', userResponse.status, userResponse.statusText);
        return { success: false, error: 'Error obteniendo detalles del usuario' };
      }

      const userDetails = await userResponse.json();
      setUser(userDetails);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userDetails));
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
      console.log('Login successful for user:', userDetails.username);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error al intentar iniciar sesión: ' + error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
