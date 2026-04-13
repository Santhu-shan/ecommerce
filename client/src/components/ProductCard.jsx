import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useStore } from '../store/useStore';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <div className="product-card glass-panel fade-in">
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
