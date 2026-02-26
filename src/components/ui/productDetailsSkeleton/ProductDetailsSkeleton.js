import React from "react";
import "./ProductDetailsSkeleton.css";

const ProductDetailsSkeleton = () => (
  <>
    <div className="product-wrapper pds-wrapper">
      <div className="image-left pds-left">
        <div className="main-img pds-main-img pds-shimmer"></div>
        <div className="thumbs pds-thumbs">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="thumb pds-thumb pds-shimmer"></div>
          ))}
        </div>
      </div>

      <div className="right pds-right">
        <div className="pds-title pds-shimmer"></div>
        <div className="pds-rating pds-shimmer"></div>

        <div className="price-section pds-price-section">
          <div className="pds-price pds-shimmer"></div>
          <div className="pds-original-price pds-shimmer"></div>
        </div>

        <div className="pds-description pds-shimmer"></div>
        <div className="pds-description pds-shimmer pds-w-80"></div>
        <div className="pds-description pds-shimmer pds-w-60"></div>

        <div className="selection-box pds-selection-box">
          <div className="size-box pds-size-box">
            <div className="pds-label pds-shimmer"></div>
            <div className="size pds-size-row">
              {[1, 2, 3].map((item) => (
                <div key={item} className="pds-size-btn pds-shimmer"></div>
              ))}
            </div>
          </div>

          <div className="quantity-box pds-quantity-box">
            <div className="pds-label pds-shimmer"></div>
            <div className="qty-box pds-qty-box pds-shimmer"></div>
          </div>
        </div>

        <div className="pds-button pds-shimmer"></div>
      </div>
    </div>

    <div className="questions pds-questions">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="pds-accordion pds-shimmer">
          <div className="pds-accordion-title"></div>
        </div>
      ))}
    </div>

    <section className="related-section pds-related-section">
      <div className="pds-section-title pds-shimmer"></div>
      <div className="related-container">
        {[1, 2, 3].map((item) => (
          <div key={item} className="related-card pds-related-card">
            <div className="image-div pds-related-img pds-shimmer"></div>
            <div className="pds-product-title pds-shimmer"></div>
            <div className="pds-product-price pds-shimmer"></div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default ProductDetailsSkeleton;
