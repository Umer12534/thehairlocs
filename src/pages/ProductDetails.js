import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import "../styles/ProductDetails.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/ui/button/Button";
import { useCart } from "../contaxt/CartContaxt";
import CartNotification from "../components/ui/cartNotification/CartNotification";

function ProductDetails({ openCartSidebar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState(null);

  // Fetch product from Firestore by ID
  useEffect(() => {
    const getProductById = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() };
          setProduct(productData);

          // Set default size to "50ml" if available
          if (productData.sizes && productData.sizes["50ml"]) {
            setSelectedSize("50ml");
          } else {
            // If 50ml not available, pick the first available size
            const firstSize = productData.sizes
              ? Object.keys(productData.sizes)[0]
              : "";
            setSelectedSize(firstSize);
          }
        } else {
          console.log("Product not found");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) getProductById();
  }, [id]);

  // Get price data based on selected size
  const sizeData = selectedSize ? product?.sizes?.[selectedSize] : null;
  const displayPrice = sizeData?.salePrice ?? sizeData?.price ?? null;
  const originalPrice = sizeData?.salePrice ? sizeData.price : null;
  const productImages = Array.isArray(product?.images)
    ? product.images
    : Array.isArray(product?.image)
      ? product.image
      : product?.images
        ? [product.images]
        : product?.image
          ? [product.image]
          : [];

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart(
      {
        id: product.id,
        name: product.name,
        image: productImages[0] || "",
        price: displayPrice ?? 0,
      },
      selectedSize,
      quantity
    );

    setNotificationProduct({
      id: product.id,
      image: productImages[0] || "",
      title: product.name,
      price: displayPrice,
      qty: quantity,
      size: selectedSize,
    });

    setShowNotification(true);
    setQuantity(1);

    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleCloseNotification = () => setShowNotification(false);
  const handleViewCart = () => {
    setShowNotification(false);
    if (openCartSidebar) {
      openCartSidebar();
      return;
    }
    navigate("/cart");
  };

  // Skeleton Loader Component
  const ProductSkeleton = () => (
    <>
      <div className="product-wrapper">
        {/* Left - Images Skeleton */}
        <div className="image-left">
          <div className="main-img skeleton-img skeleton-animation"></div>
          <div className="thumbs">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="thumb skeleton-thumb skeleton-animation"></div>
            ))}
          </div>
        </div>

        {/* Right - Product Info Skeleton */}
        <div className="right">
          <div className="skeleton-title skeleton-animation"></div>
          <div className="skeleton-rating skeleton-animation"></div>
          
          <div className="price-section">
            <div className="skeleton-price skeleton-animation"></div>
            <div className="skeleton-original-price skeleton-animation"></div>
          </div>

          <div className="skeleton-description skeleton-animation"></div>
          <div className="skeleton-description skeleton-animation" style={{ width: '80%' }}></div>
          <div className="skeleton-description skeleton-animation" style={{ width: '60%' }}></div>

          {/* Selection Box Skeleton */}
          <div className="selection-box">
            <div className="size-box">
              <div className="skeleton-label skeleton-animation"></div>
              <div className="size">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="skeleton-size-btn skeleton-animation"></div>
                ))}
              </div>
            </div>

            <div className="quantity-box">
              <div className="skeleton-label skeleton-animation"></div>
              <div className="qty-box skeleton-qty-box skeleton-animation"></div>
            </div>
          </div>

          <div className="skeleton-button skeleton-animation"></div>
        </div>
      </div>

      {/* Details Accordion Skeleton */}
      <div className="questions">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="skeleton-accordion skeleton-animation">
            <div className="skeleton-accordion-title"></div>
          </div>
        ))}
      </div>

      {/* Related Products Skeleton */}
      <section className="related-section">
        <div className="skeleton-section-title skeleton-animation"></div>
        <div className="related-container">
          {[1, 2, 3].map((item) => (
            <div key={item} className="related-card skeleton-card">
              <div className="image-div skeleton-img skeleton-animation"></div>
              <div className="skeleton-product-title skeleton-animation"></div>
              <div className="skeleton-product-price skeleton-animation"></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="error-state">
      <h2>Product Not Found</h2>
      <p>The product you're looking for doesn't exist or has been removed.</p>
      <Button 
        children="Back to Products" 
        size="lg" 
        onClick={() => window.history.back()} 
      />
    </div>
  );

  if (loading) return <ProductSkeleton />;
  if (!product) return <ErrorState />;

  return (
    <>
      <div className="product-wrapper">
        {/* Left - Images */}
        <div className="image-left">
          <div className="main-img">
            {productImages.length > 0 && (
              <img
                src={productImages[Math.min(activeImage, productImages.length - 1)]}
                alt={product.name}
              />
            )}
          </div>
          <div className="thumbs">
            {productImages.map((img, index) => (
              <button
                key={index}
                className={`thumb ${activeImage === index ? "active" : ""}`}
                onClick={() => setActiveImage(index)}
                type="button"
                aria-label={`View image ${index + 1}`}
              >
                <img src={img} alt={`${product.name} - View ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right - Product Info */}
        <div className="right">
          <h1>{product.name}</h1>
          <Stack spacing={1}>
            <Rating
              name="half-rating-read"
              value={product.rating || 0}
              precision={0.5}
              readOnly
            />
          </Stack>

          {/* Price Section */}
          <div className="price-section">
            {displayPrice ? (
              <>
                <div className="sale-price">
                  Rs. {displayPrice.toLocaleString("en-PK")}
                </div>
                {originalPrice && (
                  <div className="old-price">
                    <span className="original-price">
                      Rs. {originalPrice.toLocaleString("en-PK")}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="current-price">Select a size</div>
            )}
          </div>

          <p className="desc">
            {product.description ||
              "High-quality handmade loc extensions designed to give your hair a natural, fuller, voluminous look."}
          </p>

          {/* Selection */}
          <div className="selection-box">
            {/* Sizes */}
            <div className="size-box">
              <label>Size</label>
              <div className="size">
                {product.sizes &&
                  Object.keys(product.sizes).map((size) => (
                    <Button
                      key={size}
                      size="sm"
                      margianbuttom={0}
                      variant={selectedSize === size ? "primary" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      type="button"
                    >
                      {size}
                    </Button>
                  ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="quantity-box">
              <label>Quantity</label>
              <div className="qty-box">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  type="button"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
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
                <FontAwesomeIcon
                  icon={faCartPlus}
                  style={{ marginRight: "8px" }}
                />
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

      {/* Product Details Accordion */}
      <div className="questions">
        <details>
          <summary>
            Product Description <span className="arrow">⌄</span>
          </summary>
          <p>{product.description}</p>
        </details>
        <details>
          <summary>
            Return Policy <span className="arrow">⌄</span>
          </summary>
          <p>We offer a 30-day return policy for unused and unopened products.</p>
        </details>
        <details>
          <summary>
            Shipping Information <span className="arrow">⌄</span>
          </summary>
          <p>Orders are processed within 1–2 business days and delivered in 5–7 working days.</p>
        </details>
        <details>
          <summary>
            Care Instructions <span className="arrow">⌄</span>
          </summary>
          <p>Store in a cool, dry place. Avoid direct sunlight and moisture.</p>
        </details>
      </div>

      {/* Related Products */}
      <section className="related-section">
        <h2>Related Products</h2>
        <div className="related-container">
          {[1, 2, 3].map((item) => (
            <div key={item} className="related-card">
              <div className="image-div">
                <img src="/assets/images/sale-product (5).jpg" alt="Related product" />
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
