import React from 'react'
import { Link } from 'react-router-dom';
import './ProductCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons'

function ProductCard({ image, name, saleprice, originalprice, likes }) {
    return (
        <div className="product-card">
            <div className="product-img-container">
                <Link to={"/product-detail"} >
                    <img src={image} alt={name} className="card-image" />
                </Link>
                <div className="product-img-top">
                    <div className="like">
                        <p>{likes}</p>
                        <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                    </div>
                    <button className="cart-link">
                        <FontAwesomeIcon icon={faBagShopping}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
            <div className="product-text-holder">
                <div className="product-name">
                    <p>{name}</p>
                </div>
                <div className="product-price">
                    <p className="saleprice">PKR: {saleprice}</p>
                    <p className="originalprice">PKR: {originalprice}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
