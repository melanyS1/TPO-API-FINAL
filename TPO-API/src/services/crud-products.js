function getProductsbySeller(sellerId){
    return fetch(`http://localhost:3001/products?sellerId=${sellerId}`)
    .then((response) => response.json())
    .then((data) => {
      // Aquí puedes manejar los datos de los productos
      console.log("Productos obtenidos:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error al obtener productos:", error);
    });
}
// Actualiza un producto por su ID
function updateProductById(id, updatedData) {
  return fetch(`http://localhost:3001/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Producto actualizado:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error al actualizar producto:", error);
    });
}
// Elimina un producto por su ID
function deleteProductById(id) {
  return fetch(`http://localhost:3001/products/${id}`, { method: "DELETE" })
    .then(() => {
      console.log("Producto eliminado:", id);
      return { success: true };
    })
    .catch((error) => {
      console.error("Error al eliminar producto:", error);
      return { success: false, error };
    });
}
export {getProductsbySeller,deleteProductById,updateProductById};