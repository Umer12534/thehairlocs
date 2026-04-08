import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import "../styles/ProductDetails.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/ui/button/Button";
import { useCart } from "../contaxt/CartContaxt";
import CartNotification from "../components/ui/cartNotification/CartNotification";
import ProductDetailsSkeleton from "../components/ui/productDetailsSkeleton/ProductDetailsSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import QuestionAnswer from "../components/sections/questionAnswer/QuestionAnswer";
import ProductCard from "../components/ui/ProductCard/ProductCard";

function ProductDetails({ openCartSidebar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getFirstAvailableSize, isSizeOutOfStock } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  // Fetch product from Firestore by ID
  useEffect(() => {
    const getProductById = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() };
          setProduct(productData);
          setSelectedSize(getFirstAvailableSize(productData.sizes));
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
  }, [id, getFirstAvailableSize]);

  useEffect(() => {
    const getRelatedProducts = async () => {
      if (!product?.category || !id) {
        setRelatedProducts([]);
        return;
      }

      try {
        setRelatedLoading(true);

        const productsRef = collection(db, "products");
        const sameCategoryQuery = query(
          productsRef,
          where("category", "==", product.category),
          limit(10)
        );
        const sameCategorySnapshot = await getDocs(sameCategoryQuery);

        let matchedProducts = sameCategorySnapshot.docs
          .map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }))
          .filter((item) => item.id !== id);

        // Fallback for category case differences in existing documents.
        if (matchedProducts.length < 3) {
          const normalizedCategory = String(product.category).trim().toLowerCase();
          const allSnapshot = await getDocs(productsRef);
          const fallbackMatches = allSnapshot.docs
            .map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }))
            .filter((item) => item.id !== id)
            .filter(
              (item) =>
                typeof item.category === "string" &&
                item.category.trim().toLowerCase() === normalizedCategory
            );

          const uniqueById = new Map();
          [...matchedProducts, ...fallbackMatches].forEach((item) =>
            uniqueById.set(item.id, item)
          );
          matchedProducts = Array.from(uniqueById.values());
        }

        setRelatedProducts(matchedProducts.slice(0, 5));
      } catch (err) {
        console.error(err);
        setRelatedProducts([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    getRelatedProducts();
  }, [product, id]);

  // Get price data based on selected size
  const sizeData = selectedSize ? product?.sizes?.[selectedSize] : null;
  const displayPrice = sizeData?.salePrice ?? sizeData?.price ?? null;
  const originalPrice = sizeData?.salePrice ? sizeData.price : null;
  const selectedSizeOutOfStock = isSizeOutOfStock(product?.sizes, selectedSize);
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
        sizes: product.sizes || {},
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

  if (loading) return <ProductDetailsSkeleton />;
  if (!product) return <ErrorState />;

  return (
    <>
      <div className="product-wrapper">
        {/* Left - Images */}
        <div className="image-left">
          {productImages.length > 0 ? (
            <>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#9f0808",
                  "--swiper-pagination-color": "#7e0c0c",
                }}
                spaceBetween={10}
                navigation
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="product-main-swiper"
              >
                {productImages.map((img, index) => (
                  <SwiperSlide key={`main-${index}`}>
                    <img src={img} alt={`${product.name} ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs]}
                className="product-thumbs-swiper"
              >
                {productImages.map((img, index) => (
                  <SwiperSlide key={`thumb-${index}`}>
                    <img src={img} alt={`${product.name} thumbnail ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <div className="main-img empty-image">No image available</div>
          )}
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
                  Object.keys(product.sizes).map((size) => {
                    const isDisabled = isSizeOutOfStock(product.sizes, size);

                    return (
                      <span
                        key={size}
                        title={isDisabled ? "Out of Stock" : ""}
                        className={isDisabled ? "size-tooltip-wrapper" : ""}
                      >
                        <Button
                          size="sm"
                          marginbottom={0}
                          variant={selectedSize === size ? "primary" : "outline"}
                          onClick={() => setSelectedSize(size)}
                          type="button"
                          disabled={isDisabled}
                          className={isDisabled ? "size-option-disabled" : ""}
                        >
                          {size}
                        </Button>
                      </span>
                    );
                  })}


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
            variant="primary"
            onClick={handleAddToCart}
            disabled={!selectedSize}
            title={!selectedSize ? "Please select a size first" : "Add to cart"}
          />

          {!selectedSize && (
            <p className="size-warning">Please select a size to add to cart</p>
          )}
          {selectedSize && selectedSizeOutOfStock && (
            <p className="size-warning">This size is out of stock and cannot be selected for checkout.</p>
          )}
        </div>
      </div>

      {/* Product Details Accordion */}
      <div className="questions">
        <div className="faqs-section">
          <h2>Products Questions</h2>
          <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
          <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
          
          <h2>Shipping Questions</h2>
            <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
            <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
        </div>
        
      </div>

      {/* Related Products */}
      <section className="related-section">
        <h2>Related Products</h2>
        <div className="related-container">
          {relatedLoading ? (
            <p className="related-empty">Loading related products...</p>
          ) : relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                {...relatedProduct}
                openCartSidebar={openCartSidebar}
              />
            ))
          ) : (
            <p className="related-empty">No related products found.</p>
          )}
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

