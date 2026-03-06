import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../styles/OrderSuccess.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/ui/button/Button';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError('No order ID provided');
        setLoading(false);
        return;
      }

      try {
        const orderRef = doc(db, 'orders', orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const orderData = { id: orderSnap.id, ...orderSnap.data() };
          setOrder(orderData);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    // Handle Firestore Timestamp
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': '#f59e0b',
      'Processing': '#3b82f6',
      'Shipped': '#8b5cf6',
      'Delivered': '#22c55e',
      'Cancelled': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  if (loading) {
    return (
      <div className="order-success-loading">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-success-error">
        <h2>Oops!</h2>
        <p>{error || 'Order not found'}</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="order-success-container">
      <div className="order-success-content">
        {/* Success Message */}
        <div className="success-box">
          <div className="success-icon">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <h1>Order Confirmed Successfully!</h1>
          <p>Thank you for shopping with TheHairLocs. Your order has been received and is being processed.</p>
          <div className="order-id-badge">
            Order ID: <span>#{order.id}</span>
          </div>
        </div>

        {/* Order Information */}
        <div className="info-card">
          <h2>Order Information</h2>
          <div className="order-info-grid">
            <div className="info-item">
              <span className="info-label">Order ID</span>
              <span className="info-value">#{order.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Order Date</span>
              <span className="info-value">{formatDate(order.createdAt)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Payment Method</span>
              <span className="info-value">{order.paymentMethod}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Payment Status</span>
              <span className={`status-badge ${order.paymentStatus.toLowerCase()}`}>
                {order.paymentStatus}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Order Status</span>
              <span 
                className="status-badge" 
                style={{ backgroundColor: getStatusColor(order.orderStatus) }}
              >
                {order.orderStatus}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Total Amount</span>
              <span className="info-value total-amount">
                Rs {order.totalAmount?.toLocaleString('en-PK')}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="info-card">
          <h2>Shipping Information</h2>
          <div className="shipping-details">
            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{order.customerName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{order.phone}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{order.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Address:</span>
              <span className="detail-value">{order.shippingAddress}</span>
            </div>
            {order.shippingMethod && (
              <div className="detail-row">
                <span className="detail-label">Shipping Method:</span>
                <span className="detail-value">
                  {order.shippingMethod === 'express' ? 'Express Delivery (3-4 Days)' : 'Standard Delivery (7-10 Days)'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ordered Products */}
        <div className="info-card">
          <h2>Ordered Products</h2>
          <div className="products-list">
            {order.items?.map((item, index) => (
              <div key={index} className="product-item">
                <div className="product-image">
                  <img 
                    src={item.image || '/assets/images/products/product_not_found.png'} 
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = '/assets/images/products/product_not_found.png';
                    }}
                  />
                </div>
                <div className="product-details">
                  <h4>{item.title}</h4>
                  {item.size && <span className="product-size">Size: {item.size}</span>}
                  <span className="product-quantity">
                    Qty: {item.quantity} × Rs {item.price?.toLocaleString('en-PK')}
                  </span>
                </div>
                <div className="product-subtotal">
                  Rs {(item.price * item.quantity)?.toLocaleString('en-PK')}
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>Rs {order.subtotal?.toLocaleString('en-PK')}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>Rs {order.shippingCost?.toLocaleString('en-PK')}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total:</span>
              <span>Rs {order.totalAmount?.toLocaleString('en-PK')}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-success">
          <Button position='left' variant="primary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <Button position='right' variant="primary" onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>

        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <p>
            📧 A confirmation email has been sent to <strong>{order.email}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
