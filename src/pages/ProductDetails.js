import React, { useState } from "react";
import "../styles/ProductDetails.css";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useParams } from "react-router-dom";
import { products } from "../data/Products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/ui/button/Button';
import { useCart } from "../contaxt/CartContaxt";
import CartNotification from "../components/ui/cartNotification/CartNotification";

function ProductDetails({ openCartSidebar }) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0); // Changed to 0 for array index
  const [selectedSize, setSelectedSize] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState(null);
  
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );
  
  if (!product) {
    return <h2>Product not found</h2>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    // Add to cart
    addToCart(product, selectedSize, quantity);
    
    // Prepare product data for notification
    const notificationData = {
      id: product.id,
      image: product.image[0],
      title: product.name,
      price: product.salePrice ? `Rs. ${product.salePrice}` : `Rs. ${product.originalPrice}`,
      qty: quantity,
      size: selectedSize
    };
    
    // Show notification
    setNotificationProduct(notificationData);
    setShowNotification(true);
    // Reset quantity
    setQuantity(1);
    
    // Auto-hide notification after 4 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleViewCart = () => {
    // Close notification and open cart sidebar
    setShowNotification(false);
    if (openCartSidebar) {
      openCartSidebar();
    }
  };

  return (
    <>
      {/* Product */}
      <div className="product-wrapper">
        {/* Left — Images */}
        <div className="image-left">
          {/* Main Image */}
          <div className="main-img">
            <img
              src={product.image[activeImage]}
              alt={product.name}
            />
          </div>

          {/* Thumbnails */}
          <div className="thumbs">
            {product.image.map((img, index) => (
              <button
                key={index}
                className={`thumb ${activeImage === index ? "active" : ""}`}
                onClick={() => setActiveImage(index)}
                type="button"
                aria-label={`View image ${index + 1}`}
              >
                <img 
                  src={img} 
                  alt={`${product.name} - View ${index + 1}`} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right — Product Info */}
        <div className="right">
          <h1>{product.name}</h1>

          <Stack spacing={1}>
            <Rating 
              name="half-rating-read" 
              value={product.rating} 
              precision={0.5} 
              readOnly 
            />
          </Stack>

          <div className="price-section">
            {product.salePrice ? (
              <>
                <div className="sale-price">Rs. {product.salePrice.toLocaleString('en-PK')}</div>
                <div className="old-price">
                  <span className="original-price">Rs. {product.originalPrice.toLocaleString('en-PK')}</span>
                </div>
              </>
            ) : (
              <div className="current-price">Rs. {product.originalPrice.toLocaleString('en-PK')}</div>
            )}
          </div>

          <p className="desc">
            {product.description || "High-quality handmade loc extensions designed to give your hair a natural, fuller, voluminous look."}
          </p>

          {/* Selection */}
          <div className="selection-box">
            {/* Size */}
            <div className="size-box">
              <label>Size</label>
              <div className="size">
                {['10ml', '20ml', '30ml'].map((size) => (
                  <Button
                    key={size}
                    children={size}
                    size="sm"
                    margianbuttom={0}
                    variant={selectedSize === size ? "primary" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    type="button"
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="quantity-box">
              <label>Quantity</label>
              <div className="qty-box">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  type="button"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Increase quantity"
                  type="button"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>

          <Button 
            children={
              <>
                <FontAwesomeIcon icon={faCartPlus} style={{marginRight: '8px'}} />
                Add to Cart
              </>
            } 
            size="lg" 
            fullWidth 
            onClick={handleAddToCart}
            disabled={!selectedSize}
            title={!selectedSize ? "Please select a size first" : "Add to cart"}
          />
          
          {!selectedSize && (
            <p className="size-warning">Please select a size to add to cart</p>
          )}
        </div>
      </div>

      {/* Questions Accordion */}
      <div className="questions">
        <details>
          <summary>
            Product Description <span className="arrow">⌄</span>
          </summary>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            ex suscipit soluta maiores accusantium.
          </p>
        </details>

        <details>
          <summary>
            Return Policy <span className="arrow">⌄</span>
          </summary>
          <p>
            We offer a 30-day return policy for unused and unopened products.
          </p>
        </details>

        <details>
          <summary>
            Shipping Information <span className="arrow">⌄</span>
          </summary>
          <p>
            Orders are processed within 1–2 business days and delivered in 5–7
            working days.
          </p>
        </details>

        <details>
          <summary>
            Care Instructions <span className="arrow">⌄</span>
          </summary>
          <p>
            Store in a cool, dry place. Avoid direct sunlight and moisture.
          </p>
        </details>
      </div>

      {/* Related Products */}
      <section className="related-section">
        <h2>Related Products</h2>
        <div className="related-container">
          {[1, 2, 3].map((item) => (
            <div key={item} className="related-card">
              <div className="image-div">
                <img
                  src="/assets/images/sale-product (5).jpg"
                  alt="Related product"
                />
              </div>
              <h3>Premium Loc Extensions</h3>
              <p>Rs. 2,999</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Notification */}
      {showNotification && notificationProduct && (
        <CartNotification 
          product={notificationProduct} 
          onClose={handleCloseNotification}
          onViewCart={handleViewCart}
        />
      )}
    </>
  );
}

export default ProductDetails;