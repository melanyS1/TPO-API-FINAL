export const registerUser = async (userData) => {
  // First check if user already exists
  const checkResponse = await fetch(`http://localhost:3001/users?email=${userData.email}`);
  const existingUsers = await checkResponse.json();
  
  if (existingUsers.length > 0) {
    throw new Error('El usuario ya existe');
  }

  // If user doesn't exist, create new user
  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: Date.now().toString(), // Generate a unique ID
      username: userData.name,
      email: userData.email,
      password: userData.password, // In a real app, this should be hashed
    }),
  });

  if (!response.ok) {
    throw new Error('Error al registrar usuario');
  }

  const newUser = await response.json();
  return { success: true, user: newUser };
};

export const loginUser = async (data) => {
  console.log("Datos que se enviarían al backend (login):", data);

  if (data.email === "test@correo.com" && data.password === "1234") {
    return { success: true, user: data };
  } else {
    throw new Error("Credenciales inválidas");
  }
};
