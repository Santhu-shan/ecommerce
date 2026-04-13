import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';

function App() {
  const user = useStore((state) => state.user);

  return (
    <Router>
      <Navbar />
      <div className="page-wrapper container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
          <Route 
            path="/admin" 
            element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
