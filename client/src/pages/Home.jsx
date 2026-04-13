import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="slide-up">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2>Our <span className="title-glow">Collection</span></h2>
      </div>

      {loading ? (
        <p>Loading premium products...</p>
      ) : products.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <h3>No products found</h3>
          <p className="product-desc" style={{ marginTop: '1rem' }}>Admins need to add products to the catalog.</p>
        </div>
      ) : (
        <div className="grid-3">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
