import React from 'react'
import './CartSidebar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const cartItems = [
  {
    id: 1,
    image: "/assets/images/categories/CATEGORY1.png",
    title: "Hair Locs Moisture Cream",
    price: "Rs. 2,500",
    qty: 1,
    size: "100ml"

  },
  {
    id: 2,
    image: "/assets/images/categories/CATEGORY2.png",
    title: "Loc Growth Oil",
    price: "Rs. 3,000",
    qty: 2,
    size: "50ml"
  }
];

function CartItem({
    image,
    title,
    price,
    qty,
    size
}){
    return(
        <>
        <div className="item">
            <div className="item-container">
                <img src={image} alt='title' />
                <div className="item-info">
                    <h4>{title}</h4>
                    <div className="product-detail">
                        <p>{price}</p>
                        <p>Size: {size}</p>
                    </div>
                        <div className="qty-controls">
                            <button>-</button>
                            <span>{qty}</span>
                            <button>+</button>
                        </div>


                </div>
            </div>
            <button className="remove-item"> 
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>          
        </div>
        </>
    )
    
}

function CartSiderbar( {isCartOpen, closeCart} ){

    useEffect(() => {
        if(isCartOpen)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'auto';
        return () =>{
            document.body.style.overflow = 'auto';
        };
    }, [isCartOpen])

    return (
    <>
        {/* Overlay */}
        {isCartOpen && (
            <div className="overlay" onClick={closeCart}></div>
        )}
        <div className={` cart-sidebar ${isCartOpen? 'active':''}`}>
            {/* Header */}
            <div className="cart-header">
                <div className="cart-header-text">Your Cart</div>
                <div className="close-btn"  onClick={closeCart}>
                <FontAwesomeIcon icon={faXmark} />
                </div>
            </div>
            {/* body */}
            
            <div className="cart-items">
                {cartItems.map((item)=>(
                    <CartItem 
                    key={item.id}
                    {...item}
                    />
                    
                ))}

            </div>

            {/* Footer */}
            <div className="cart-footer">
                <div className="cart-des">
                    <p><span>Total: </span><span> 5000 PKR</span></p>
                    <p>Tex and Shipping not included</p>
                </div>
                <Link to="/" className='checkout-btn'>
                Proceed to Checkout
                </Link>
            </div>
        </div>
    </>
    )
}
export default CartSiderbar
