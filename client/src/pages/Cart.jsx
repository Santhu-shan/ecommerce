import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="slide-up">
      <h2 style={{ marginBottom: '2rem' }}>Shopping <span className="title-glow">Cart</span></h2>
      
      {cart.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <ShoppingBag size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
          <h3>Your cart is empty</h3>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Browse Products</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem' }}>
          <div className="cart-items" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map((item) => (
              <div key={item.product._id} className="glass-panel flex-between" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '80px', height: '80px', background: 'var(--bg-secondary)', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>{item.product.name}</h4>
                    <p style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.25rem' }}>
                    <button className="btn-icon" onClick={() => updateQuantity(item.product._id, item.quantity - 1)} disabled={item.quantity <= 1} style={{ color: 'var(--text-primary)', padding: '0.25rem' }}>
                      <Minus size={16} />
                    </button>
                    <span style={{ margin: '0 1rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button className="btn-icon" onClick={() => updateQuantity(item.product._id, item.quantity + 1)} style={{ color: 'var(--text-primary)', padding: '0.25rem' }}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <button className="btn-icon" onClick={() => removeFromCart(item.product._id)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
              <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>Order Summary</h3>
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex-between" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                <span>Total</span>
                <span style={{ color: 'var(--accent-color)' }}>${total.toFixed(2)}</span>
              </div>
              
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '2rem' }}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
