import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CheckCircle } from 'lucide-react';
import api from '../api';

const Checkout = () => {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Format items for backend
    const orderItems = cart.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.price
    }));

    try {
      await api.post('/orders', {
        orderItems,
        totalAmount: total
      });
      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Checkout failed', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="slide-up container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', paddingTop: '5rem' }}>
        <div className="glass-panel" style={{ padding: '4rem 2rem' }}>
          <CheckCircle size={64} style={{ color: 'var(--success-color)', margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ marginBottom: '1rem' }}>Payment <span className="title-glow">Successful</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Your order has been placed. We'll send you an email confirmation shortly.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="slide-up container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Secure <span className="title-glow">Checkout</span></h2>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <form onSubmit={handleCheckout}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Shipping Information</h3>
          <div className="input-group">
            <label>Full Address</label>
            <input type="text" className="input-control" required placeholder="123 Example St, City, Country" />
          </div>
          
          <h3 style={{ marginBottom: '1.5rem', marginTop: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Payment (Mock)</h3>
          <div className="input-group">
            <label>Card Number</label>
            <input type="text" className="input-control" required placeholder="4242 4242 4242 4242" />
          </div>
          <div className="flex-between" style={{ gap: '1rem' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Expiry</label>
              <input type="text" className="input-control" required placeholder="MM/YY" />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>CVC</label>
              <input type="password" className="input-control" required placeholder="123" />
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            <div className="flex-between">
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Total to pay:</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '2rem', fontSize: '1.1rem', padding: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
