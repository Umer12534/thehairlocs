import React from "react";
import "../styles/Cart.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../contaxt/CartContaxt";

function CartPageItem({
  item,
  onRemove,
  onUpdate,
  onChangeSize,
  onToggleSelection,
  isOutOfStock,
}) {
  const { id, image, title, price, qty, size, sizes = {}, selected } = item;
  const sizeOptions = Object.keys(sizes);

  const updateQty = (newQty) => {
    if (newQty < 1 || isOutOfStock) return;
    onUpdate(id, size, newQty);
  };

  return (
    <div className={`cart-page-item${isOutOfStock ? " cart-page-item--disabled" : ""}`}>
      <label className="cart-item-checkbox">
        <input
          type="checkbox"
          checked={selected}
          disabled={isOutOfStock}
          onChange={(e) => onToggleSelection(id, size, e.target.checked)}
        />
        <span />
      </label>

      <img src={image} alt={title} />

      <div className="cart-page-info">
        <h4>{title}</h4>
        <p className="price">Rs. {Number(price).toLocaleString("en-PK")}</p>
        {isOutOfStock && <p className="stock-note">Out of stock. This item cannot be checked out.</p>}

        <div className="size-select">
          <label>Size:</label>
          <select value={size} onChange={(e) => onChangeSize(id, size, e.target.value)}>
            {sizeOptions.map((option) => {
              const optionOutOfStock = Number(sizes?.[option]?.stock || 0) <= 0;

              return (
                <option key={option} value={option} disabled={optionOutOfStock && option !== size}>
                  {option}{optionOutOfStock ? " - Out of Stock" : ""}
                </option>
              );
            })}
          </select>
        </div>

        <div className="qty-controls">
          <button onClick={() => updateQty(qty - 1)} disabled={isOutOfStock}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{qty}</span>
          <button onClick={() => updateQty(qty + 1)} disabled={isOutOfStock}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      <div className="cart-page-total">
        <p>Rs. {(price * qty).toLocaleString("en-PK")}</p>
        <button onClick={() => onRemove(id, size)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    clearCart,
    changeItemSize,
    toggleItemSelection,
    toggleAllSelections,
    getCheckoutItems,
    isSizeOutOfStock,
  } = useCart();

  const checkoutItems = getCheckoutItems();
  const eligibleItems = cartItems.filter((item) => !isSizeOutOfStock(item.sizes, item.size));
  const selectedEligibleCount = checkoutItems.length;
  const allEligibleSelected = eligibleItems.length > 0 && eligibleItems.every((item) => item.selected);
  const selectedTotal = calculateTotal(true);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <Link to="/products" className="btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      <div className="cart-page-toolbar">
        <label className="cart-select-all">
          <input
            type="checkbox"
            checked={allEligibleSelected}
            disabled={eligibleItems.length === 0}
            onChange={(e) => toggleAllSelections(e.target.checked)}
          />
          <span>Select all available items</span>
        </label>
        <span className="cart-selection-count">
          {selectedEligibleCount} item{selectedEligibleCount === 1 ? "" : "s"} selected
        </span>
      </div>

      <div className="cart-page-list">
        {cartItems.map((item) => (
          <CartPageItem
            key={`${item.id}-${item.size}`}
            item={item}
            onRemove={removeFromCart}
            onUpdate={updateQuantity}
            onChangeSize={changeItemSize}
            onToggleSelection={toggleItemSelection}
            isOutOfStock={isSizeOutOfStock(item.sizes, item.size)}
          />
        ))}
      </div>

      <div className="cart-page-summary">
        <div className="summary-row">
          <span>Selected Total</span>
          <span>Rs. {selectedTotal.toLocaleString("en-PK")}</span>
        </div>

        <p className="note">Tax and shipping are calculated from selected products at checkout.</p>

        <div className="cart-page-actions">
          <button className="clear" onClick={clearCart}>
            Clear Cart
          </button>

          <Link
            to="/checkout"
            className={`checkout${selectedEligibleCount === 0 ? " checkout-disabled" : ""}`}
            onClick={(e) => {
              if (selectedEligibleCount === 0) {
                e.preventDefault();
              }
            }}
          >
            Checkout Selected
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
