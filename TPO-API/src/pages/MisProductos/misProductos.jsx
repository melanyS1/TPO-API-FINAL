import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import './misProductos.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No hay sesión activa. Por favor, inicia sesión.');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

const MisProductos = () => {
    
  const { user } = useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', stock: '', description: '', image: '', categoryId: '' });
  const [showCreate, setShowCreate] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProducts();
    // eslint-disable-next-line
  }, [user]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const headers = getAuthHeaders();
      const sellerId = user?.id ?? user?.userId ?? user?.uid ?? user?.username;
      if (!sellerId) {
        console.error('No se pudo determinar el ID del vendedor');
        return;
      }
      const res = await fetch(`${API_URL}/products?sellerId=${sellerId}`, { headers });
      if (!res.ok) {
        throw new Error(`Error al obtener productos: ${res.status}`);
      }
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching products', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // manejar selección/arrastre de archivo y convertir a data URL para preview
  const validateImageUrl = (url) => {
    if (!url) return true; // Empty URL is ok
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar producto?')) return;
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`${API_URL}/publicaciones/${id}`, { method: 'DELETE', headers });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Error al eliminar (${res.status})`);
      }
      // actualizar la lista llamando a fetchProducts para mantener consistencia
      await fetchProducts();
      // hacer scroll al listado
      const listEl = document.querySelector('.products-list');
      listEl && listEl.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    // Tomar el primer id de categoría si existe en el arreglo de categorías del producto
    const currentCategoryId = Array.isArray(product.categories) && product.categories.length > 0
      ? product.categories[0]?.id ?? ''
      : '';
    setForm({ 
      name: product.name, 
      price: product.price, 
      stock: product.stock, 
      description: product.description, 
      image: product.image, 
      categoryId: String(currentCategoryId)
    });
    setShowCreate(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', price: '', stock: '', description: '', image: '', categoryId: '' });
  };

  const saveEdit = async (id) => {
    try {
      // Buscar el producto original en la lista
      const original = products.find(p => String(p.id) === String(id));
      if (!original) throw new Error('Producto original no encontrado');

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay sesión activa. Por favor, inicia sesión.');
      }

      // Construir el body según PublicacionRequest del backend
      const bodyBase = {
        name: form.name || original.name,
        price: parseFloat(form.price || original.price || '0'),
        stock: Number(form.stock || original.stock || '0'),
        description: form.description || original.description,
        image: form.image || original.image,
        // Mantener featured si viene del backend, por defecto false
        featured: Boolean(original.featured) || false
      };

      // Si el usuario seleccionó una categoría, enviarla como array de IDs
      // Caso contrario, no incluir "categories" para que el backend no las modifique
      const body = form.categoryId
        ? { ...bodyBase, categories: [ Number(form.categoryId) ] }
        : bodyBase;

      const headers = getAuthHeaders();
      const res = await fetch(`${API_URL}/publicaciones/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Error al actualizar: ${res.status} ${errorData}`);
      }

      // refrescar lista
      await fetchProducts();
      cancelEdit();
      // hacer scroll al listado
      const listEl = document.querySelector('.products-list');
      listEl && listEl.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    }
  };

  const createProduct = async () => {
    try {
      // validaciones
      if (!form.name || !form.price) {
        alert('Completá al menos nombre y precio.');
        return;
      }
      
      if (form.image && !validateImageUrl(form.image)) {
        alert('La URL de la imagen debe comenzar con http:// o https://');
        return;
      }

      const sellerId = user?.id ?? user?.userId ?? user?.uid ?? user?.username;
      if (!sellerId) {
        throw new Error('No se pudo determinar el ID del vendedor');
      }
      const body = { ...form, price: parseFloat(form.price), stock: Number(form.stock), sellerId };

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay sesión activa. Por favor, inicia sesión.');
      }

      const headers = getAuthHeaders();
      const res = await fetch(`${API_URL}/publicaciones`, { 
        method: 'POST', 
        headers,
        body: JSON.stringify({
          ...body,
          categories: body.categoryId ? [body.categoryId] : [], // Convert categoryId to categories array
          featured: false // Add default value for featured field
        }) 
      });

      if (res.ok) {
        const created = await res.json();
        setProducts(prev => [ ...prev, created ]);
        setForm({ name: '', price: '', stock: '', description: '', image: '', categoryId: '' });
        setShowCreate(false);
        setTimeout(() => {
          const listEl = document.querySelector('.products-list');
          listEl && listEl.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }

      // Si la respuesta no es ok, intentar leer el texto de error
      const text = await res.text();
      console.error('Error creating product:', res.status, text);
      // fallback: crear localmente para desarrollo
      const fallback = { ...body, id: Date.now().toString() };
      setProducts(prev => [ ...prev, fallback ]);
      setForm({ name: '', price: '', stock: '', description: '', image: '', categoryId: '' });
      setShowCreate(false);
      alert('Producto agregado localmente (no guardado en servidor). Revisa la consola para más detalles.');
      setTimeout(() => {
        const listEl = document.querySelector('.products-list');
        listEl && listEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Network error creating product', err);
      // fallback local
      const sellerId = user?.id ?? user?.userId ?? user?.uid ?? user?.username ?? 0;
      const fallback = { ...form, price: parseFloat(form.price || 0), stock: Number(form.stock || 0), sellerId, id: Date.now().toString() };
      setProducts(prev => [ ...prev, fallback ]);
      setForm({ name: '', price: '', stock: '', description: '', image: '', categoryId: '' });
      setShowCreate(false);
      alert('Producto agregado localmente (sin conexión al servidor).');
      setTimeout(() => {
        const listEl = document.querySelector('.products-list');
        listEl && listEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  if (!user) return null;

  return (
    <div className="mis-productos-page">
      <div className="container">
        <h2>Mis productos</h2>
        <button className="add-btn" onClick={() => { setShowCreate(!showCreate); cancelEdit(); }}>
          {showCreate ? 'Cancelar' : 'Agregar producto'}
        </button>

        {showCreate && (
          <div className="product-form">
            <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
            <input name="price" placeholder="Precio" value={form.price} onChange={handleChange} />
            <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
            <select 
              name="categoryId" 
              value={form.categoryId} 
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {/* Campo para URL de imagen */}
            <input 
              name="image" 
              placeholder="URL de la imagen (http:// o https://)" 
              value={form.image} 
              onChange={handleChange}
            />
            {form.image && (
              <img 
                className="upload-preview" 
                src={form.image} 
                alt="preview" 
                style={{ maxWidth: '200px', marginTop: '10px' }}
              />
            )}
            <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
            <button onClick={createProduct}>Crear</button>
          </div>
        )}

        {loading ? <p>Cargando...</p> : (
          <div className="products-list">
            {products.length === 0 && <p>No tenés productos cargados.</p>}
            {products.map(p => (
              <div key={p.id} className="product-item">
                {editingId === p.id ? (
                  <div className="product-form">
                    <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
                    <input name="price" placeholder="Precio" value={form.price} onChange={handleChange} />
                    <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
                    <select 
                      name="categoryId" 
                      value={form.categoryId} 
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {/* Campo para URL de imagen en modo edición */}
                    <input 
                      name="image" 
                      placeholder="URL de la imagen (http:// o https://)" 
                      value={form.image} 
                      onChange={handleChange}
                    />
                    {form.image && (
                      <img 
                        className="upload-preview" 
                        src={form.image} 
                        alt="preview" 
                        style={{ maxWidth: '200px', marginTop: '10px' }}
                      />
                    )}
                    <textarea name="description" value={form.description} onChange={handleChange} />
                    <button onClick={() => saveEdit(p.id)}>Guardar</button>
                    <button onClick={cancelEdit}>Cancelar</button>
                  </div>
                ) : (
                  <>
                    <div className="product-main">
                      <img src={p.image} alt={p.name} />
                      <div className="meta">
                        <h3>{p.name}</h3>
                        <p>Precio: ${p.price}</p>
                        <p>Stock: {p.stock}</p>
                      </div>
                    </div>
                    <div className="product-actions">
                      <button onClick={() => startEdit(p)}>Editar</button>
                      <button onClick={() => handleDelete(p.id)}>Eliminar</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisProductos;