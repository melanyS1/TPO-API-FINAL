const BASE_URL = 'http://localhost:8080';

export const api = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Error al registrar usuario');
    }

    return { success: true, message: 'Usuario registrado exitosamente' };
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  }
};

export const loginUser = async (data) => {
  if (data.email === "test@correo.com" && data.password === "1234") {
    return { success: true, user: data };
  } else {
    throw new Error("Credenciales inválidas");
  }
};
