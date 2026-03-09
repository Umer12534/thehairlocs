import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contaxt/CartContaxt';
import { db, auth } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock, faTruck, faBolt, faCreditCard,
  faMoneyBillWave, faChevronRight, faTag, faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, calculateTotal, getCheckoutItems, clearPurchasedItems } = useCart();
  const checkoutItems = getCheckoutItems();

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
    saveInformation: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const shippingRates = { express: 199, standard: 99, free: 0 };
  const shippingCost = shippingRates[formData.shippingMethod];
  const subtotal = calculateTotal(true);
  const total = checkoutItems.length > 0 ? subtotal + shippingCost : 0;

  useEffect(() => {
    if ((cartItems.length === 0 || checkoutItems.length === 0) && !orderCompleted) navigate('/cart');
  }, [cartItems.length, checkoutItems.length, navigate, orderCompleted]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkoutItems.length === 0) {
      navigate('/cart');
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setIsSubmitting(true);
    try {
      const userId = auth.currentUser?.uid || 'guest';
      const orderData = {
        userId,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.city}, ${formData.postalCode || ''}, ${formData.country}`,
        items: checkoutItems.map(item => ({
          productId: item.id || '',
          title: item.title || item.name || '',
          price: typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0,
          quantity: item.qty || 1,
          size: item.size || '',
          image: item.image || item.images?.[0] || '',
        })),
        totalAmount: total, shippingCost, subtotal,
        paymentMethod: formData.paymentMethod === 'cod' ? 'COD' : 'Card',
        paymentStatus: formData.paymentMethod === 'cod' ? 'Unpaid' : 'Paid',
        orderStatus: 'Pending',
        shippingMethod: formData.shippingMethod,
        createdAt: serverTimestamp(),
      };
      const ordersRef = collection(db, 'orders');
      const docRef = await addDoc(ordersRef, orderData);
      const localOrder = {
        id: docRef.id, date: new Date().toISOString(),
        customer: {
          email: formData.email, phone: formData.phone,
          name: `${formData.firstName} ${formData.lastName}`,
          address: `${formData.address}, ${formData.city}, ${formData.country}`,
          apartment: formData.apartment, postalCode: formData.postalCode,
        },
        items: checkoutItems,
        shipping: { method: formData.shippingMethod, cost: shippingCost },
        payment: formData.paymentMethod, subtotal, shippingCost, total,
      };
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(localOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      setOrderCompleted(true);
      clearPurchasedItems();
      navigate(`/order-success/${docRef.id}`);
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0 || checkoutItems.length === 0) {
    return (
      <div className="co-empty-state">
        <div className="co-empty-icon">🛍️</div>
        <h2 className="co-empty-title">No eligible items selected</h2>
        <p className="co-empty-text">Select at least one in-stock cart item before checking out.</p>
        <Link to="/cart" className="co-shop-btn">Back to Cart</Link>
      </div>
    );
  }

  const shippingOptions = [
    { value: 'express',  icon: faBolt,  label: 'Express Delivery',  sub: '3–4 business days',   price: 199, badge: 'FASTEST' },
    { value: 'standard', icon: faTruck, label: 'Standard Delivery', sub: '7–10 business days',  price: 99,  badge: null },
    { value: 'free',     icon: faTag,   label: 'Free Shipping',     sub: '14–18 business days', price: 0,   badge: 'FREE' },
  ];

  return (
    <main className="co-main">

      {/* TOP BAR */}
      <div className="co-topbar">
        
        <div className="co-steps">
          {['Contact', 'Delivery', 'Payment'].map((step, i) => (
            <React.Fragment key={step}>
              <span className={`co-step${activeStep >= i + 1 ? ' active' : ''}`}>
                <span className="co-step-num">{i + 1}</span>
                {step}
              </span>
              {i < 2 && <FontAwesomeIcon icon={faChevronRight} className="co-step-arrow" />}
            </React.Fragment>
          ))}
        </div>
        <div className="co-topbar-spacer" />
      </div>

      <div className="co-layout">

        {/* FORM COLUMN */}
        <section className="co-form-col">
          <form onSubmit={handleSubmit} noValidate>

            {/* 01 CONTACT */}
            <div className="co-card" onClick={() => setActiveStep(1)}>
              <div className="co-card-header">
                <span className="co-card-num">01</span>
                <h2 className="co-card-title">Contact Information</h2>
                <Link to="/login" className="co-sign-link">Sign in</Link>
              </div>
              <div className="co-field-row">
                <div className="co-field">
                  <label className="co-label">Email address</label>
                  <input className={`co-input${errors.email ? ' co-input--err' : ''}`}
                    type="email" name="email" placeholder="you@example.com"
                    value={formData.email} onChange={handleChange} />
                  {errors.email && <span className="co-err-msg">{errors.email}</span>}
                </div>
                <div className="co-field">
                  <label className="co-label">Phone number</label>
                  <input className={`co-input${errors.phone ? ' co-input--err' : ''}`}
                    type="tel" name="phone" placeholder="+92 300 0000000"
                    value={formData.phone} onChange={handleChange} />
                  {errors.phone && <span className="co-err-msg">{errors.phone}</span>}
                </div>
              </div>
              <label className="co-checkbox">
                <input type="checkbox" name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter} onChange={handleChange} />
                <span className="co-checkbox-box" />
                <span>Keep me updated with news and exclusive offers</span>
              </label>
            </div>

            {/* 02 DELIVERY */}
            <div className="co-card" onClick={() => setActiveStep(2)}>
              <div className="co-card-header">
                <span className="co-card-num">02</span>
                <h2 className="co-card-title">Delivery Address</h2>
              </div>
              <div className="co-field">
                <label className="co-label">Country / Region</label>
                <select className="co-input co-select" name="country"
                  value={formData.country} onChange={handleChange}>
                  <option>Pakistan</option>
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                </select>
              </div>
              <div className="co-field-row">
                <div className="co-field">
                  <label className="co-label">First name</label>
                  <input className={`co-input${errors.firstName ? ' co-input--err' : ''}`}
                    type="text" name="firstName" placeholder="John"
                    value={formData.firstName} onChange={handleChange} />
                  {errors.firstName && <span className="co-err-msg">{errors.firstName}</span>}
                </div>
                <div className="co-field">
                  <label className="co-label">Last name</label>
                  <input className={`co-input${errors.lastName ? ' co-input--err' : ''}`}
                    type="text" name="lastName" placeholder="Doe"
                    value={formData.lastName} onChange={handleChange} />
                  {errors.lastName && <span className="co-err-msg">{errors.lastName}</span>}
                </div>
              </div>
              <div className="co-field">
                <label className="co-label">Street address</label>
                <input className={`co-input${errors.address ? ' co-input--err' : ''}`}
                  type="text" name="address" placeholder="123 Main Street"
                  value={formData.address} onChange={handleChange} />
                {errors.address && <span className="co-err-msg">{errors.address}</span>}
              </div>
              <div className="co-field">
                <label className="co-label">Apartment, suite, etc. <span className="co-optional">(optional)</span></label>
                <input className="co-input" type="text" name="apartment"
                  placeholder="Apt 4B" value={formData.apartment} onChange={handleChange} />
              </div>
              <div className="co-field-row">
                <div className="co-field">
                  <label className="co-label">City</label>
                  <input className={`co-input${errors.city ? ' co-input--err' : ''}`}
                    type="text" name="city" placeholder="Lahore"
                    value={formData.city} onChange={handleChange} />
                  {errors.city && <span className="co-err-msg">{errors.city}</span>}
                </div>
                <div className="co-field">
                  <label className="co-label">Postal code <span className="co-optional">(optional)</span></label>
                  <input className="co-input" type="text" name="postalCode"
                    placeholder="54000" value={formData.postalCode} onChange={handleChange} />
                </div>
              </div>
              <label className="co-checkbox">
                <input type="checkbox" name="saveInformation"
                  checked={formData.saveInformation} onChange={handleChange} />
                <span className="co-checkbox-box" />
                <span>Save this information for next time</span>
              </label>
            </div>

            {/* 03 SHIPPING METHOD */}
            <div className="co-card">
              <div className="co-card-header">
                <span className="co-card-num">03</span>
                <h2 className="co-card-title">Shipping Method</h2>
              </div>
              <div className="co-ship-grid">
                {shippingOptions.map(opt => (
                  <label key={opt.value}
                    className={`co-ship-card${formData.shippingMethod === opt.value ? ' selected' : ''}`}>
                    <input type="radio" name="shippingMethod" value={opt.value}
                      checked={formData.shippingMethod === opt.value}
                      onChange={handleChange} hidden />
                    <div className="co-ship-icon">
                      <FontAwesomeIcon icon={opt.icon} />
                    </div>
                    <div className="co-ship-info">
                      <div className="co-ship-top">
                        <strong>{opt.label}</strong>
                        {opt.badge && <span className="co-ship-badge">{opt.badge}</span>}
                      </div>
                      <span className="co-ship-sub">{opt.sub}</span>
                    </div>
                    <div className="co-ship-price">
                      {opt.price === 0
                        ? <span className="co-free-label">Free</span>
                        : `Rs ${opt.price}`}
                    </div>
                    <div className="co-radio-dot" />
                  </label>
                ))}
              </div>
            </div>

            {/* 04 PAYMENT */}
            <div className="co-card" onClick={() => setActiveStep(3)}>
              <div className="co-card-header">
                <span className="co-card-num">04</span>
                <h2 className="co-card-title">Payment Method</h2>
                <span className="co-secure-tag">
                  <FontAwesomeIcon icon={faShieldAlt} /> Secure
                </span>
              </div>
              <p className="co-sub-note">All transactions are 256-bit SSL encrypted.</p>
              <div className="co-pay-grid">
                <label className={`co-pay-card${formData.paymentMethod === 'cod' ? ' selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="cod"
                    checked={formData.paymentMethod === 'cod'} onChange={handleChange} hidden />
                  <div className="co-pay-icon co-pay-icon--cod">
                    <FontAwesomeIcon icon={faMoneyBillWave} />
                  </div>
                  <div className="co-pay-info">
                    <strong>Cash on Delivery</strong>
                    <span>Pay when you receive</span>
                  </div>
                  <div className="co-radio-dot" />
                </label>
                <label className={`co-pay-card${formData.paymentMethod === 'card' ? ' selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="card"
                    checked={formData.paymentMethod === 'card'} onChange={handleChange} hidden />
                  <div className="co-pay-icon co-pay-icon--card">
                    <FontAwesomeIcon icon={faCreditCard} />
                  </div>
                  <div className="co-pay-info">
                    <strong>Credit / Debit Card</strong>
                    <span>Visa, Mastercard, AMEX</span>
                  </div>
                  <div className="co-radio-dot" />
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="co-card-fields">
                  <div className="co-field">
                    <label className="co-label">Card number</label>
                    <input className="co-input" type="text" placeholder="1234  5678  9012  3456" />
                  </div>
                  <div className="co-field-row">
                    <div className="co-field">
                      <label className="co-label">Expiry date</label>
                      <input className="co-input" type="text" placeholder="MM / YY" />
                    </div>
                    <div className="co-field">
                      <label className="co-label">CVV</label>
                      <input className="co-input" type="text" placeholder="•••" />
                    </div>
                  </div>
                  <div className="co-field">
                    <label className="co-label">Name on card</label>
                    <input className="co-input" type="text" placeholder="John Doe" />
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'cod' && (
                <div className="co-cod-note">
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                  <span>Please keep exact change ready. Our delivery partner will collect payment upon delivery.</span>
                </div>
              )}
            </div>

            {/* 05 BILLING ADDRESS */}
            <div className="co-card">
              <div className="co-card-header">
                <span className="co-card-num">05</span>
                <h2 className="co-card-title">Billing Address</h2>
              </div>
              <div className="co-billing-opts">
                {[
                  { value: 'same',      label: 'Same as shipping address' },
                  { value: 'different', label: 'Use a different billing address' },
                ].map(opt => (
                  <label key={opt.value}
                    className={`co-billing-opt${formData.billingAddress === opt.value ? ' selected' : ''}`}>
                    <input type="radio" name="billingAddress" value={opt.value}
                      checked={formData.billingAddress === opt.value}
                      onChange={handleChange} hidden />
                    <div className="co-radio-dot" />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* SUBMIT */}
            <button type="submit" disabled={isSubmitting} className="co-submit-btn">
              {isSubmitting ? (
                <span className="co-spinner" />
              ) : (
                <>
                  <FontAwesomeIcon icon={faLock} />
                  <span>Place Order · Rs {total.toLocaleString('en-PK')}</span>
                </>
              )}
            </button>

            <div className="co-footer-links">
              {['FAQs', 'Privacy Policy', 'Shipping Policy', 'Refund Policy'].map(l => (
                <Link key={l} to={`/${l.toLowerCase().replace(/ /g, '-')}`}>{l}</Link>
              ))}
            </div>

          </form>
        </section>

        {/* SUMMARY COLUMN */}
        <aside className="co-summary-col">
          <div className="co-summary-inner">
            <div className="co-summary-hd">
              <h2>Order Summary</h2>
              <Link to="/cart" className="co-edit-cart">Edit cart</Link>
            </div>
            <div className="co-items-list">
              {checkoutItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="co-item">
                  <div className="co-item-img-wrap">
                    <img src={item.image} alt={item.title} />
                    <span className="co-item-qty">{item.qty}</span>
                  </div>
                  <div className="co-item-details">
                    <p className="co-item-name">{item.title}</p>
                    {item.size && <p className="co-item-meta">Size: {item.size}</p>}
                  </div>
                  <p className="co-item-price">Rs {Number(item.price).toLocaleString('en-PK')}</p>
                </div>
              ))}
            </div>
            <div className="co-totals">
              <div className="co-total-row">
                <span>Subtotal</span>
                <span>Rs {subtotal.toLocaleString('en-PK')}</span>
              </div>
              <div className="co-total-row">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? 'co-free-label' : ''}>
                  {shippingCost === 0 ? 'Free' : `Rs ${shippingCost.toLocaleString('en-PK')}`}
                </span>
              </div>
              <div className="co-total-row co-grand">
                <span>Total</span>
                <span>Rs {total.toLocaleString('en-PK')}</span>
              </div>
            </div>
            <div className="co-trust">
              <div className="co-trust-item"><FontAwesomeIcon icon={faLock} /><span>256-bit SSL encrypted</span></div>
              <div className="co-trust-item"><FontAwesomeIcon icon={faTruck} /><span>Free returns within 30 days</span></div>
              <div className="co-trust-item"><FontAwesomeIcon icon={faShieldAlt} /><span>Buyer protection guaranteed</span></div>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default Checkout;
