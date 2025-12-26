import React from 'react'
import { Link } from 'react-router-dom';
import './ProductCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons'

function ProductCard({ image, name, saleprice, originalprice, likes, badgeType, badgeText, category }) {
    return (
        <div className="product-card">
            {badgeType && (
              // Badge - sale / New / Sold Out
                <div className={`${badgeType}-badge`}>
                    {badgeText}
                </div>
            )}
            {category && (
              // Category
                <div className='product-image-overlay product-category'>
                    {category}
                </div>
            )}
            <div className="product-img-container">
                <Link to={"/product-detail"} >
                    <img src={image} alt={name} className="card-image" />
                </Link>
                <div className="product-img-top">
                    {likes && (
                        <div className="like">
                            <p>{likes}</p>
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                        </div>
                    )}
                    
                    <button className="cart-link">
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
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
