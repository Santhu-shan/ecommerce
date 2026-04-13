import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ShoppingCart, User, LogOut, Code } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, setUser, cart } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="container flex-between nav-content">
        <Link to="/" className="nav-brand">
          <Code className="brand-icon" />
          <span>Nexus<span className="title-glow">Store</span></span>
        </Link>
        <div className="nav-links">
          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-item">Dashboard</Link>
          )}
          <Link to="/cart" className="nav-item cart-link">
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} className="btn-icon">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <User size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
