import React from 'react';
import './CartSidebar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../../ui/button/Button';
import { useCart } from '../../../contaxt/CartContaxt';

function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
  onToggleSelection,
  onClose,
  isOutOfStock,
}) {
  const { id, image, title, price, qty, size, selected } = item;

  const handleQuantityChange = (newQty) => {
    if (newQty < 1 || isOutOfStock) return;
    onUpdateQuantity(id, size, newQty);
  };

  return (
    <div className={`item${isOutOfStock ? ' item--disabled' : ''}`}>
      <label className="sidebar-checkbox">
        <input
          type="checkbox"
          checked={selected}
          disabled={isOutOfStock}
          onChange={(e) => onToggleSelection(id, size, e.target.checked)}
        />
        <span />
      </label>

      <div className="item-container">
        <Link to={`/product/${id}`} onClick={() => { onClose(); }}>
          <img src={image} alt={title} />
        </Link>

        <div className="item-info">
          <h4>{title}</h4>

          <div className="product-detail">
            <p>Rs. {Number(price).toLocaleString('en-PK')}</p>
            {size && (
              <div className="size-div">
                <p>Size: {size}</p>
              </div>
            )}
          </div>

          {isOutOfStock && <p className="sidebar-stock-note">Out of stock</p>}

          <div className="qty-controls">
            <button onClick={() => handleQuantityChange(qty - 1)} disabled={isOutOfStock}>
              <FontAwesomeIcon icon={faMinus} />
            </button>

            <span>{qty}</span>

            <button onClick={() => handleQuantityChange(qty + 1)} disabled={isOutOfStock}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>

      <button className="remove-item" onClick={() => onRemove(id, size)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

function CartSidebar({ isCartOpen, closeCart }) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    clearCart,
    toggleItemSelection,
    toggleAllSelections,
    getCheckoutItems,
    isSizeOutOfStock
  } = useCart();

  const eligibleItems = cartItems.filter((item) => !isSizeOutOfStock(item.sizes, item.size));
  const selectedCount = getCheckoutItems().length;
  const totalPrice = calculateTotal(true);
  const allEligibleSelected = eligibleItems.length > 0 && eligibleItems.every((item) => item.selected);

  return (
    <div className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}>
      <div className="cart-header">
        <div className="cart-header-text">
          Your Cart ({cartItems.length} items)
        </div>
      </div>

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
            <div className="sidebar-toolbar">
              <label className="sidebar-select-all">
                <input
                  type="checkbox"
                  checked={allEligibleSelected}
                  disabled={eligibleItems.length === 0}
                  onChange={(e) => toggleAllSelections(e.target.checked)}
                />
                <span>Select available</span>
              </label>
              <span className="sidebar-selection-count">{selectedCount} selected</span>
            </div>

            {cartItems.map((item) => (
              <CartItem
                key={`${item.id}-${item.size}`}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
                onToggleSelection={toggleItemSelection}
                onClose={closeCart}
                isOutOfStock={isSizeOutOfStock(item.sizes, item.size)}
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

      {cartItems.length > 0 && (
        <div className="cart-footer">
          <div className="cart-des">
            <p>
              <span>Selected Total:</span>
              <span>Rs. {totalPrice.toLocaleString('en-PK')}</span>
            </p>
            <p>Only selected in-stock products will be checked out.</p>
          </div>

          <Link
            to="/checkout"
            className={`checkout-btn${selectedCount === 0 ? ' checkout-btn--disabled' : ''}`}
            onClick={(e) => {
              if (selectedCount === 0) {
                e.preventDefault();
                return;
              }

              closeCart();
            }}
          >
            Checkout Selected
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;
