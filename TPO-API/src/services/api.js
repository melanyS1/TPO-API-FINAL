export const registerUser = async (data) => {
  console.log("Datos que se enviarían al backend (registro):", data);
  return { success: true, user: data };
};

export const loginUser = async (data) => {
  console.log("Datos que se enviarían al backend (login):", data);

  if (data.email === "test@correo.com" && data.password === "1234") {
    return { success: true, user: data };
  } else {
    throw new Error("Credenciales inválidas");
  }
};
