import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './OverLay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Overlay = ({ isOpen, onClose, children, position = 'center' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const positionClasses = {
    left: 'overlay-content-left',
    right: 'overlay-content-right',
    top: 'overlay-content-top',
    bottom: 'overlay-content-bottom',
    center: 'overlay-content-center',
    search: 'overlay-content-search' // New position
  };

  return ReactDOM.createPortal(
    <div className="overlay">
      <div 
        className="overlay-backdrop" 
        onClick={onClose}
        aria-label="Close overlay"
      />
      <div className={`overlay-content ${positionClasses[position]}`}>
        <button 
          className="overlay-close-btn" 
          onClick={onClose}
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('overlay-root')
  );
};

export default Overlay;