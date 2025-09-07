import products from "../data/products";

function purchaseCart(cart) {
  // Lógica para procesar la compra del carrito
  if (cart.items.length === 0) {
    console.log("El carrito está vacío. No se puede procesar la compra.");
    return;
  }

  if (!verifyStock(cart)) {
    console.log("No hay suficiente stock para completar la compra.");
    return;
  }else {
    // Reducir el stock de los productos
    cart.items.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        product.stock -= item.qty;
      }
    });
    }
  console.log("Procesando compra para el carrito:", cart);
  console.log("Estado del inventario después de la compra:", products);
}

function verifyStock(cart) {
  for (let item of cart.items) {
    const product = products.find((p) => p.id === item.id);
    if (!product || product.stock < item.qty) {
      return false; // Stock insuficiente
    }
  }
    return true; // Stock suficiente
}

export { purchaseCart, verifyStock};