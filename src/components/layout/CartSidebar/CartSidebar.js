import React from 'react'
import './CartSidebar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import Button from '../../ui/button/Button'
import { useCart } from '../../../contaxt/CartContaxt'

function CartItem({
  id,
  image,
  title,
  price,
  qty,
  size,
  onRemove,
  onUpdateQuantity
}){
  const handleQuantityChange = (newQty) => {
    onUpdateQuantity(id, size, newQty);
  }

  const handleRemove = () => {
    onRemove(id, size);
  }

  return(
    <>
      <div className="item">
        <div className="item-container">
          <img src={image} alt={title} />
          <div className="item-info">
            <h4>{title}</h4>
            <div className="product-detail">
              <p>{price}</p>
              {size && (
                <div className="size-div">
                  <p>Size: {size}</p>
                </div>
              )}
            </div>

            <div className="qty-controls">
              <button onClick={() => handleQuantityChange(qty - 1)}>
                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
              </button>
              <span>{qty}</span>
              <button onClick={() => handleQuantityChange(qty + 1)}>
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              </button>
            </div>
          </div>
        </div>
        <button className="remove-item" onClick={handleRemove}> 
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
        </button>          
      </div>
    </>
  )
}


function CartSiderbar({ isCartOpen, closeCart }){
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    calculateTotal,
    clearCart 
  } = useCart();

  useEffect(() => {
    if(isCartOpen)
      document.body.style.overflow = 'hidden';
    else
      document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen])

  const total = calculateTotal();

  return (
    <>
      <div className={` cart-sidebar ${isCartOpen ? 'active' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-text">
            Your Cart ({cartItems.length} items)
          </div>
        </div>
        
        {/* body */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <Link to="/product" onClick={closeCart}>
                <Button children="Continue Shopping" variant="primary" />
              </Link>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItem 
                  key={`${item.id}-${item.size}`}
                  {...item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
              
              {/* Clear Cart Button */}
              <div className="cart-actions">
                <button 
                  className="clear-cart-btn"
                  onClick={clearCart}
                >
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
                <span>Rs. 6-00</span>
              </p>
              <p>Tax and Shipping not included</p>
            </div>
            <Link to="/checkout" className='checkout-btn' onClick={closeCart}>
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default CartSiderbar