import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";

function ProductCard({
  image,
  name,
  salePrice,
  originalPrice,
  likes,
  badgeType,
  badgeText,
  category,
}) {
  return (
    <div className="product-card">
      
      {/* Badge */}
      {badgeType && (
        <span className={`product-badge product-badge--${badgeType}`}>
          {badgeText}
        </span>
      )}

      {/* Image */}
      <div className="product-card__image-wrapper">
        <Link to="/product-detail">
          <img src={image} alt={name} className="product-card__image" />
        </Link>

        {/* Overlay */}
        <div className="product-card__overlay">
          {category && (
            <span className="product-card__category">{category}</span>
          )}

          <div className="product-card__actions">
            {likes && (
              <div className="product-card__like">
                <span>{likes}</span>
                <FontAwesomeIcon icon={faHeart} />
              </div>
            )}

            <button className="product-card__add-btn">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="product-card__content">
        <p className="product-card__name">{name}</p>

        <div className="product-card__price">
          <span className="price--sale">PKR {salePrice}</span>
          {originalPrice && (
            <span className="price--original">PKR{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
