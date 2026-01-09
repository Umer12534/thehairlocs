import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contaxt/CartContaxt';
import './Checkout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, calculateTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'Pakistan',
    shippingMethod: 'express',
    paymentMethod: 'cod',
    billingAddress: 'same',
    subscribeNewsletter: true,
    saveInformation: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingCost = 199;
  const subtotal = calculateTotal();
  const total = subtotal + shippingCost;

  useEffect(() => {
    // Redirect if cart is empty
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems.length, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' || type === 'radio' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save order
      const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        customer: {
          email: formData.email,
          phone: formData.phone,
          name: `${formData.firstName} ${formData.lastName}`,
          address: `${formData.address}, ${formData.city}, ${formData.country}`,
          apartment: formData.apartment,
          postalCode: formData.postalCode
        },
        items: cartItems,
        shipping: {
          method: formData.shippingMethod,
          cost: shippingCost
        },
        payment: formData.paymentMethod,
        subtotal,
        shipping: shippingCost,
        total
      };
      
      // Save to localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Clear cart
      clearCart();
      
      // Navigate to confirmation
      navigate('/order-confirmed', { 
        state: { 
          orderId: order.id,
          orderTotal: total
        } 
      });
      
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-checkout">
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart before checking out.</p>
        <Link to="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="main-contant">
      <div className="checkout-container">
        {/* Checkout Form */}
        <section className="checkout-form">
          <h1>Checkout</h1>
          
          <form onSubmit={handleSubmit}>
            {/* Contact Section */}
            <div className="section">
              <div className="section-header">
                <h2>Contact</h2>
                <Link to="/login">Sign in</Link>
              </div>
              
              <div className="section-input">
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="input-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleChange}
                />
                <span>Email me with news and offers</span>
              </label>
            </div>

            {/* Delivery Section */}
            <div className="section">
              <h2>Delivery</h2>

              <div className="input-group">
                <label htmlFor="country">Country/Region</label>
                <select 
                  id="country"
                  name="country"
                  className="country-select"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="Pakistan">Pakistan</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>

              <div className="row">
                <div className="input-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                
                <div className="input-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="col">
                <div className="input-group">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                
                <div className="input-group">
                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                
                <div className="input-group">
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal code (optional)"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`phone-nmuber ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="saveInformation"
                  checked={formData.saveInformation}
                  onChange={handleChange}
                />
                Save this information for next time
              </label>
            </div>

            {/* Shipping Section */}
            <div className="section">
              <h2>Shipping method</h2>

              <label className="boxed-option">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="express"
                  checked={formData.shippingMethod === 'express'}
                  onChange={handleChange}
                  hidden
                />
                <div className={`option-content ${formData.shippingMethod === 'express' ? 'active' : ''}`}>
                  <div>
                    <strong>Express Delivery</strong>
                    <p>3-4 Day's Delivery Time</p>
                  </div>
                  <strong>Rs 199.00</strong>
                </div>
              </label>
              
              <label className="boxed-option">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="standard"
                  checked={formData.shippingMethod === 'standard'}
                  onChange={handleChange}
                  hidden
                />
                <div className={`option-content ${formData.shippingMethod === 'standard' ? 'active' : ''}`}>
                  <div>
                    <strong>Standard Delivery</strong>
                    <p>7-10 Day's Delivery Time</p>
                  </div>
                  <strong>Rs 99.00</strong>
                </div>
              </label>
            </div>

            {/* Payment Section */}
            <div className="section">
              <h2>Payment</h2>
              <p className="muted">All transactions are secure and encrypted.</p>

              <label className="boxed-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  hidden
                />
                <div className={`option-content ${formData.paymentMethod === 'cod' ? 'active' : ''}`}>
                  Cash on Delivery (COD)
                </div>
              </label>
              
              <label className="boxed-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  hidden
                />
                <div className={`option-content ${formData.paymentMethod === 'card' ? 'active' : ''}`}>
                  Credit/Debit Card
                </div>
              </label>
              
              {formData.paymentMethod === 'card' && (
                <div className="card-details">
                  <div className="input-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="row">
                    <div className="input-group">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="input-group">
                      <label>CVV</label>
                      <input type="text" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Billing Section */}
            <div className="section">
              <h2>Billing address</h2>

              <div className="billing-address">
                <label className="radio">
                  <input
                    type="radio"
                    name="billingAddress"
                    value="same"
                    checked={formData.billingAddress === 'same'}
                    onChange={handleChange}
                  />
                  Same as shipping address
                </label>

                <label className="radio">
                  <input
                    type="radio"
                    name="billingAddress"
                    value="different"
                    checked={formData.billingAddress === 'different'}
                    onChange={handleChange}
                  />
                  Use a different billing address
                </label>
              </div>
            </div>

            <div className="complete-order-btn">
              <button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Complete order - Rs ${total.toLocaleString('en-PK')}`}
              </button>
            </div>
          </form>
          
          <div className="footer-links">
            <ul>
              <li><Link to="/faqs">F.A.Qs</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/refund-policy">Refund Policy</Link></li>
            </ul>
          </div>
        </section>

        {/* Cart Summary */}
        <aside className="cart-summary">
          <div className="summary-header">
            <h2>Order Summary</h2>
            <Link to="/cart" className="edit-cart">Edit cart</Link>
          </div>
          
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item-summary">
                <div className="item-image-container">
                  <img src={item.image} alt={item.title} />
                  <span className="item-quantity">{item.qty}</span>
                </div>
                <div className="item-details">
                  <h4>{item.title}</h4>
                  {item.size && <p className="item-size">Size: {item.size}</p>}
                  <p className="item-price">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>Rs {subtotal.toLocaleString('en-PK')}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>Rs {shippingCost.toLocaleString('en-PK')}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>Rs {total.toLocaleString('en-PK')}</span>
            </div>
          </div>

          <div className="payment-security">
            <div className="security-badge">
              <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
              <span>Secure Payment</span>
            </div>
            <p className="muted">Your payment information is encrypted and secure.</p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;