import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../../contaxt/CartContaxt";
import { useFavorites } from "../../../contaxt/FavoritesContext";
import Overlay from "../overlay/OverLay";
import CartSiderbar from "../../layout/CartSidebar/CartSidebar";

// MUI imports
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function ProductCard({
  id,
  images = [],
  name,
  sizes = {},
  sale,
  likes = 0,
  category,
  isNewArrival,
  rating = 0,
  openCartSidebar,
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, getFirstAvailableSize } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isLiked = isFavorite(id);

  // Extract prices and stock from sizes
  const sizeEntries = Object.entries(sizes);
  const defaultSize = getFirstAvailableSize(sizes);

  const prices = sizeEntries.map(([_, value]) => value.price);
  const originalPrice = Math.min(...prices);

  const totalStock = sizeEntries.reduce((acc, [_, value]) => acc + (value.stock || 0), 0);

  // Sale price calculation
  const salePrice = sale?.isOnSale
    ? Math.round(originalPrice - (originalPrice * sale.percentage) / 100)
    : null;

  const handleQuickAdd = () => {
    addToCart(
      {
        id,
        name,
        image: images[0],
        price: salePrice ?? originalPrice,
        sizes,
      },
      defaultSize,
      1
    );

    if (openCartSidebar) {
      openCartSidebar(); // OPEN CART
    }

    setIsCartOpen(true);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLiked) {
      removeFromFavorites(id);
    } else {
      addToFavorites({
        id,
        name,
        images,
        price: salePrice ?? originalPrice,
        sizes,
        sale,
        category,
        rating
      });
    }
  };

  // Badge logic (SALE, NEW, OUT OF STOCK)
  const badges = [];

  // SALE badge - will be positioned left
  if (sale?.isOnSale) {
    badges.push({ type: "sale", text: `-${sale.percentage}%`, position: "left" });
  }

  // NEW badge - will be positioned right
  if (isNewArrival) {
    badges.push({ type: "new", text: "New", position: "right" });
  }

  // OUT OF STOCK badge if stock = 0
  if (totalStock === 0) {
    badges.push({ type: "out-of-stock", text: "Out of Stock", position: "left" });
  }

  return (
    <>
      <div className="product-card">
        <div className="productCard-div">
          <Link to={`/Product/${id}`}>
            <div className="product-card__image-wrapper">
              {/* Badges */}
              {badges.length > 0 && (
                <div className="product-badges">
                  <div className="product-badges__left">
                    {badges
                      .filter((badge) => badge.position === "left")
                      .map((badge, index) => (
                        <span
                          key={`left-${index}`}
                          className={`product-badge product-badge--${badge.type} product-badge--left`}
                        >
                          {badge.text}
                        </span>
                      ))}
                  </div>
                  <div className="product-badges__right">
                    {badges
                      .filter((badge) => badge.position === "right")
                      .map((badge, index) => (
                        <span
                          key={`right-${index}`}
                          className={`product-badge product-badge--${badge.type} product-badge--right`}
                        >
                          {badge.text}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              <img src={images?.[0]} alt={name} className="product-card__image" />
              {/* Overlay */}
              <div className="product-card__overlay">
                {category && <span className="product-card__category">{category}</span>}
              </div>
            </div>
          </Link>

          <div className="product-card__actions">
            <button 
              className={`product-card__like ${isLiked ? 'product-card__like--active' : ''}`}
              onClick={handleLike}
            >
              {likes > 0 && <span className="product-card__like-count">{likes}</span>}
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button
              className="product-card__add-btn"
              onClick={handleQuickAdd}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="product-card__content">
          <p className="product-card__name">{name}</p>

          {/* Price */}
          <div className="product-card__price">
            <span className="price--sale">PKR {salePrice ?? originalPrice}</span>
            {salePrice && (
              <span className="price--original">PKR {originalPrice}</span>
            )}
          </div>
        </div>
          {/* Rating */}
          <div className="product-card__rating-wrapper">
            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                value={rating}
                precision={0.5}
                readOnly
                size="small"
                className="product-card__rating"
              />
            </Stack>
            <span className="product-card__rating-value">{rating.toFixed(1)}</span>
          </div>
      </div>

      {/* Cart Sidebar */}
      <Overlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} position="right">
        <CartSiderbar isCartOpen={isCartOpen} closeCart={() => setIsCartOpen(false)} />
      </Overlay>
    </>
  );
}

export default ProductCard; 
