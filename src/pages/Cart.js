import React from "react";
import "../styles/Cart.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../contaxt/CartContaxt";

/* ---------------- CART PAGE ITEM ---------------- */
function CartPageItem({ item, onRemove, onUpdate, onChangeSize }) {
    const { id, image, title, price, qty, size } = item;

    const sizes = ["10ml", "20ml", "30ml"];

    const updateQty = (newQty) => {
        if (newQty < 1) return;
        onUpdate(id, size, newQty);
    };

    return (
        <div className="cart-page-item">
        <img src={image} alt={title} />

        <div className="cart-page-info">
            <h4>{title}</h4>

            <p className="price">Rs. {price}</p>

            {/* SIZE CHANGE */}
            <div className="size-select">
                <label>Size:</label>
                <select
                    value={size}
                    onChange={(e) =>
                    onChangeSize(id, size, e.target.value)
                    }
                >
                    {sizes.map(s => (
                    <option key={s} value={s}>
                        {s}
                    </option>
                    ))}
                </select>
            </div>

            <div className="qty-controls">
            <button onClick={() => updateQty(qty - 1)}>
                <FontAwesomeIcon icon={faMinus} />
            </button>

            <span>{qty}</span>

            <button onClick={() => updateQty(qty + 1)}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            </div>
        </div>

        <div className="cart-page-total">
            <p>Rs. {(price * qty).toLocaleString()}</p>
            <button onClick={() => onRemove(id, size)}>
            <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
        </div>
    );
    }

    /* ---------------- CART PAGE ---------------- */
    function Cart() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        calculateTotal,
        clearCart,
        changeItemSize
    } = useCart();

    if (cartItems.length === 0) {
        return (
        <div className="cart-empty">
            <h2>Your Cart is Empty</h2>
            <Link to="/product" className="btn">
            Continue Shopping
            </Link>
        </div>
        );
    }

    return (
        <div className="cart-page">
        <h2>Your Shopping Cart</h2>

        <div className="cart-page-list">
            {cartItems.map(item => (
            <CartPageItem
                key={`${item.id}-${item.size}`}
                item={item}
                onRemove={removeFromCart}
                onUpdate={updateQuantity}
                onChangeSize={changeItemSize}
            />
            ))}
        </div>

        <div className="cart-page-summary">
            <div className="summary-row">
            <span>Total</span>
            <span>Rs. {calculateTotal().toLocaleString()}</span>
            </div>

            <p className="note">Tax & shipping calculated at checkout</p>

            <div className="cart-page-actions">
            <button className="clear" onClick={clearCart}>
                Clear Cart
            </button>

            <Link to="/checkout" className="checkout">
                Proceed to Checkout
            </Link>
            </div>
        </div>
        </div>
    );
}

export default Cart;
