function purchaseCart(cart) {
  // Lógica para procesar la compra del carrito

  if (cart.items.length === 0) {
    console.log("El carrito está vacío. No se puede procesar la compra.");
    return;
  }

  verifyStock(cart).then((isStockSufficient) => {
    if (!isStockSufficient) {
      console.log("No hay suficiente stock para completar la compra.");
      return;
    } else {
      cart.items.forEach((item) => {
        getProductById(item.id).then((product) => {
          if (product) {
            partialUpdateProductStock(product.id, product.stock - item.qty);
          }
        });
      });
    }
  });
}

function verifyStock(cart) {
  return getProducts().then((products) => {
    for (let item of cart.items) {
      const product = products.find((p) => p.id === item.id);
      if (!product || product.stock < item.qty) {
        return false; // Stock insuficiente
      }
    }
    return true; // Stock suficiente
  });
}

function getProducts(categoryId = null) {
  const baseUrl = "http://localhost:8080/api";
  const url = categoryId 
    ? `${baseUrl}/products/category/${categoryId}`
    : `${baseUrl}/products`;
    
  console.log('Fetching products from URL:', url);
  
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Productos obtenidos:", data);
      // Filter by category if specified
      if (categoryId) {
        const filtered = data.filter(product => 
          // Check if product has this category in its categories array
          product.categories && product.categories.some(cat => cat.id === Number(categoryId))
        );
        return filtered;
      }
      return data || [];
    })
    .catch((error) => {
      console.error("Error al obtener productos:", error);
      return []; // Return empty array on error to avoid undefined
    });
}

function getProductById(id) {
  return fetch(`http://localhost:8080/api/products/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      return response.json();
    })
    .then(data => {
      console.log("Producto obtenido:", data);
      return data;
    })
    .catch(error => {
      console.error("Error al obtener el producto:", error);
      throw error;
    });
}

function partialUpdateProductStock(id, newStock) {
  return fetch(`http://localhost:8080/api/products/${id}`, {
    method: "PATCH", // Usamos PATCH para actualización parcial
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stock: newStock }), // Solo enviamos el campo que queremos actualizar
  });
}

export { purchaseCart, verifyStock, getProducts, getProductById };
