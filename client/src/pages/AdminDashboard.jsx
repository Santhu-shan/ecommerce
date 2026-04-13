import React, { useState, useEffect } from 'react';
import api from '../api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', {
        name,
        description,
        price: Number(price),
        image,
        stock: Number(stock)
      });
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
      setStock('');
      fetchProducts();
    } catch (err) {
      console.error('Failed to add product', err);
      alert('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="slide-up">
      <h2 style={{ marginBottom: '2rem' }}>Admin <span className="title-glow">Dashboard</span></h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Add New Product</h3>
          <form onSubmit={handleAddProduct}>
            <div className="input-group">
              <label>Name</label>
              <input type="text" className="input-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea className="input-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            <div className="input-group">
              <label>Price ($)</label>
              <input type="number" step="0.01" className="input-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Image URL</label>
              <input type="url" className="input-control" value={image} onChange={(e) => setImage(e.target.value)} required placeholder="https://example.com/image.jpg" />
            </div>
            <div className="input-group">
              <label>Stock</label>
              <input type="number" className="input-control" value={stock} onChange={(e) => setStock(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Product</button>
          </form>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Product Inventory</h3>
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>Image</th>
                  <th style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>Name</th>
                  <th style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>Price</th>
                  <th style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>Stock</th>
                  <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0' }}>
                      <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                    </td>
                    <td style={{ padding: '1rem 0', fontWeight: '500' }}>{p.name}</td>
                    <td style={{ padding: '1rem 0', color: 'var(--accent-color)' }}>${p.price.toFixed(2)}</td>
                    <td style={{ padding: '1rem 0' }}>{p.stock}</td>
                    <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
