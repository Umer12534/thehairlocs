import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { products } from "../../../data/Products";

function ProductCard({
  id,
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
    <>

    <div className="product-card">
      
      {/* Badge */}
      {badgeType && (
        <span className={`product-badge product-badge--${badgeType}`}>
          {badgeText}
        </span>
      )}

      <div className="productCard-div">
        <Link to={`/Product/${id}`}>
          {/* Image */}
          <div className="product-card__image-wrapper">
            <img src={image[0]} alt={name} className="product-card__image" />
            {/* Overlay */}
            <div className="product-card__overlay">
              {category && (
                <span className="product-card__category">{category}</span>
              )}
              
            </div>
          </div>
        </Link>

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


        {/* Content */}
        <div className="product-card__content">
          <p className="product-card__name">{name}</p>

          <div className="product-card__price">

            <span className="price--sale">PKR {salePrice ? salePrice : originalPrice}</span>
            
            {salePrice&& (
              <span className="price--original">PKR {originalPrice}</span>
            )
            }
          </div>
        </div>
      
    </div>
    </>
  );
}

export default ProductCard;
