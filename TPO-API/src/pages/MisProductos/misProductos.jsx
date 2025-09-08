import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import './MisProductos.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const MisProductos = () => {
    
  const { user } = useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', stock: '', description: '', image: '', categoryId: '' });
  const [showCreate, setShowCreate] = useState(false);

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
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      // filtrar por sellerId que coincida con el id del usuario
      const sellerId = user?.id ?? user?.userId ?? user?.uid ?? user?.username;
      const myProducts = data.filter(p => String(p.sellerId) === String(sellerId));
      setProducts(myProducts);
    } catch (err) {
      console.error('Error fetching products', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // manejar selección/arrastre de archivo y convertir a data URL para preview
  const handleFileChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(prev => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const onDragOver = (e) => e.preventDefault();

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar producto?')) return;
    try {
      await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
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
    setForm({ name: product.name, price: product.price, stock: product.stock, description: product.description, image: product.image, categoryId: product.categoryId });
    setShowCreate(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', price: '', stock: '', description: '', image: '', categoryId: '' });
  };

  const saveEdit = async (id) => {
    try {
      const body = { ...form, price: parseFloat(form.price), stock: Number(form.stock) };
      const res = await fetch(`${API_URL}/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error('No se pudo actualizar');
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
      // validaciones simples
      if (!form.name || !form.price) {
        alert('Completá al menos nombre y precio.');
        return;
      }

      const sellerId = user?.id ?? user?.userId ?? user?.uid ?? user?.username ?? 0;
      const body = { ...form, price: parseFloat(form.price), stock: Number(form.stock), sellerId };

      const res = await fetch(`${API_URL}/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

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
            <input name="categoryId" placeholder="Category ID" value={form.categoryId} onChange={handleChange} />
            {/* Area de subida de imágenes */}
            <div className="upload-area" onDrop={onDrop} onDragOver={onDragOver}>
              {form.image ? (
                <img className="upload-preview" src={form.image} alt="preview" />
              ) : (
                <div className="upload-placeholder">
                  <p><strong>Seleccionar o arrastrar los archivos aquí</strong></p>
                  <small>Subí tu imagen en JPG, JPEG, PNG o WEBP, con resolución mínima de 500px y hasta 10 MB.</small>
                </div>
              )}
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files[0])} />
            </div>
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
                    <input name="name" value={form.name} onChange={handleChange} />
                    <input name="price" value={form.price} onChange={handleChange} />
                    <input name="stock" value={form.stock} onChange={handleChange} />
                    <input name="categoryId" value={form.categoryId} onChange={handleChange} />
                    {/* reemplazo del input de imagen por área de upload en modo edición */}
                    <div className="upload-area" onDrop={onDrop} onDragOver={onDragOver}>
                      {form.image ? (
                        <img className="upload-preview" src={form.image} alt="preview" />
                      ) : (
                        <div className="upload-placeholder">
                          <p><strong>Seleccionar o arrastrar los archivos aquí</strong></p>
                          <small>Subí tu imagen en JPG, JPEG, PNG o WEBP, con resolución mínima de 500px y hasta 10 MB.</small>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files[0])} />
                    </div>
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