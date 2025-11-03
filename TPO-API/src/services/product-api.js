// Procesa el checkout en el backend (descuenta stock en servidor)
async function processCheckout(sessionId = null) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No hay sesión activa. Por favor, inicia sesión.');

  const url = new URL('http://localhost:8080/api/carrito/procesar');
  if (sessionId) url.searchParams.set('sessionId', sessionId);

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || `Error en checkout (${res.status})`);
  }
  try { return JSON.parse(text); } catch { return { message: text }; }
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
  const ts = Date.now();
  const url = categoryId 
    ? `${baseUrl}/products/category/${categoryId}?_=${ts}`
    : `${baseUrl}/products?_=${ts}`;
    
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
  const ts = Date.now();
  return fetch(`http://localhost:8080/api/products/${id}?_=${ts}`)
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

export { processCheckout, verifyStock, getProducts, getProductById };

// Agregar item al carrito en backend (para usuarios logueados)
export async function addCartItem({ productoId, cantidad, usuarioId }) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No hay sesión activa.');
  const res = await fetch('http://localhost:8080/api/carrito/agregar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productoId, cantidad, usuarioId })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `Error al agregar al carrito (${res.status})`);
  }
  return res.json();
}

// --- Invitados: manejo de sessionId y sync con backend ---
export function getSessionId() {
  let sid = localStorage.getItem('sessionId');
  if (!sid) {
    // Generar un id simple (suficiente para esta app)
    sid = `sid_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem('sessionId', sid);
  }
  return sid;
}

export async function addCartItemGuest({ productoId, cantidad, sessionId }) {
  const res = await fetch('http://localhost:8080/api/carrito/agregar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productoId, cantidad, sessionId })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `Error al agregar al carrito (guest) (${res.status})`);
  }
  return res.json();
}
