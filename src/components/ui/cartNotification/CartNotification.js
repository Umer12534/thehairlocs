import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import './CartNotification.css';

function CartNotification({ product, onClose, onViewCart }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-close after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300); // Wait for animation to complete
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // Wait for animation to complete
  };

  return (
    <div className={`cart-notification ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="notification-content">
        <div className="notification-header">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <span>Added to Cart</span>
          <button className="close-btn" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="notification-body">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-image"
          />
          <div className="product-info">
            <h4>{product.title}</h4>
            <p className="product-price">{product.price}</p>
            {product.size && (
              <p className="product-size">Size: {product.size}</p>
            )}
            <p className="product-quantity">Quantity: {product.qty}</p>
          </div>
        </div>
        
        <div className="notification-footer">
          <button className="view-cart-btn" onClick={handleClose}>
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartNotification;