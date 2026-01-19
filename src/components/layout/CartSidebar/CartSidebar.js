import React from 'react'
import './CartSidebar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from '../../ui/button/Button'
import { useCart } from '../../../contaxt/CartContaxt'

/* ---------------- CART ITEM ---------------- */
function CartItem({
  id,
  image,
  title,
  price,
  qty,
  size,
  onRemove,
  onUpdateQuantity,
  onClose,
}) {
  const handleQuantityChange = (newQty) => {
    if (newQty < 1) return;
    onUpdateQuantity(id, size, newQty);
  };

  const handleRemove = () => {
    onRemove(id, size);
  };

  return (
    <div className="item">
      <div className="item-container">
        <Link to={`/product/${id}`} onClick={() => {onClose();}}>
          <img src={image} alt={title} />
        </Link>

        <div className="item-info">
          <h4>{title}</h4>

          <div className="product-detail">
            <p>Rs. {price}</p>
            {size && (
              <div className="size-div">
                <p>Size: {size}</p>
              </div>
            )}
          </div>

          <div className="qty-controls">
            <button onClick={() => handleQuantityChange(qty - 1)}>
              <FontAwesomeIcon icon={faMinus} />
            </button>

            <span>{qty}</span>

            <button onClick={() => handleQuantityChange(qty + 1)}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>

      <button className="remove-item" onClick={handleRemove}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

/* ---------------- CART SIDEBAR ---------------- */
function CartSidebar({ isCartOpen, closeCart }) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    clearCart
  } = useCart();

  const totalPrice = calculateTotal();

  return (
    <div className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}>
      
      {/* Header */}
      <div className="cart-header">
        <div className="cart-header-text">
          Your Cart ({cartItems.length} items)
        </div>
      </div>

      {/* Body */}
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/products" onClick={closeCart}>
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map(item => (
              <CartItem
                key={`${item.id}-${item.size}`}
                {...item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
                onClose={closeCart}
              />
            ))}

            <div className="cart-actions">
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="cart-footer">
          <div className="cart-des">
            <p>
              <span>Total: </span>
              <span>Rs. {totalPrice.toLocaleString()}</span>
            </p>
            <p>Tax and Shipping not included</p>
          </div>

          <Link
            to="/checkout"
            className="checkout-btn"
            onClick={closeCart}
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;
