import React from "react";
import "./ProductSkeleton.css";

const ProductSkeleton = ({ layout = 3 }) => {
  const skeletonCount = layout * 2;

    return (
        <>
        {Array.from({ length: skeletonCount }).map((_, index) => (
            <div className="skeleton-card" key={index}>
            <div className="skeleton-image-wrapper">
                <div className="skeleton-image"></div>
                <div className="skeleton-badge"></div>
                <div className="skeleton-actions">
                <div className="skeleton-action-btn"></div>
                <div className="skeleton-action-btn"></div>
                </div>
            </div>

            <div className="skeleton-content">
                <div className="skeleton-text-container">
                <div className="skeleton-name"></div>
                </div>
                <div className="skeleton-price-container">
                <div className="skeleton-sale-price"></div>
                <div className="skeleton-original-price"></div>
                </div>
            </div>

            <div className="skeleton-rating">
                <div className="skeleton-rating-stars"></div>
                <div className="skeleton-rating-value"></div>
            </div>
            </div>
        ))}
        </>
    );
};

export default ProductSkeleton;