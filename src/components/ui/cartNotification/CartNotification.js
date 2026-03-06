import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import './CartNotification.css';

const AUTO_CLOSE_DURATION = 3000;

function CartNotification({ product, onClose, onViewCart }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const closeTimerRef = useRef(null);
  const startTimeRef = useRef(null);
  const remainingRef = useRef(AUTO_CLOSE_DURATION);

  const startTimer = useCallback((duration) => {
    startTimeRef.current = Date.now();
    closeTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 400);
    }, duration);
  }, [onClose]);

  const pauseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      const elapsed = Date.now() - startTimeRef.current;
      remainingRef.current = Math.max(remainingRef.current - elapsed, 0);
      setIsPaused(true);
    }
  };

  const resumeTimer = () => {
    setIsPaused(false);
    startTimer(remainingRef.current);
  };

  useEffect(() => {
    const enterTimer = setTimeout(() => setIsVisible(true), 10);
    startTimer(AUTO_CLOSE_DURATION);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(closeTimerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    clearTimeout(closeTimerRef.current);
    setIsVisible(false);
    setTimeout(() => onClose(), 400);
  };

  const handleViewCart = () => {
    clearTimeout(closeTimerRef.current);
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      onViewCart();
    }, 400);
  };

  return (
    <div
      className={`cart-notification ${isVisible ? 'visible' : 'hidden'} ${isPaused ? 'paused' : ''}`}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      <div className="notification-content">
        <div className="notification-header">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <span>Added to Cart</span>
          <button className="close-btn" onClick={handleClose} aria-label="Close">
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

          <div className="product-info">
            <p className="product-title">{product.title}</p>
            <button className="view-cart-btn" onClick={handleViewCart}>
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartNotification;