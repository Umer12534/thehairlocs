import React from 'react';
import './CategoryCardSkeleton.css';

function CategoryCardSkeleton() {
  return (
    <div className="category-card-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-text-container">
        <div className="skeleton-name"></div>
        <div className="skeleton-total">
          <div className="skeleton-icon"></div>
          <div className="skeleton-count"></div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCardSkeleton;