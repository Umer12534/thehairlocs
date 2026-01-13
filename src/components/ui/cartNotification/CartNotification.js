import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import './CartNotification.css';

function CartNotification({ product, onClose, onViewCart }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleViewCart = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      onViewCart();
    }, 300);
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
          <div className="product-img">
            <img 
              src={product.image} 
              alt={product.title} 
              className="product-image"
            />
          </div>
          
          <p className="product-title">{product.title}</p>
          <button className="view-cart-btn" onClick={handleViewCart}>
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartNotification;