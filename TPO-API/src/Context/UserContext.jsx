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
      const response = await fetch(`http://localhost:3001/users?email=${email}`);
      
      if (!response.ok) {
        console.error('Server response not ok:', response.status, response.statusText);
        return { success: false, error: 'Error de conexión con el servidor' };
      }
      
      const users = await response.json();
      console.log('Found users:', users.length);
      
      const matchedUser = users.find(u => u.email === email && u.password === password);
      
      if (matchedUser) {
        // Remove password from user object before storing in state
        const { password: _, ...userWithoutPassword } = matchedUser;
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('isAuthenticated', 'true');
        console.log('Login successful for user:', userWithoutPassword.username);
        return { success: true };
      } else {
        console.log('No matching user found for:', email);
        return { success: false, error: 'Email o contraseña incorrectos' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error al intentar iniciar sesión: ' + error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
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
