import React from 'react';
import ProductCard from '../../ui/ProductCard/ProductCard';
import './ProductsSection.css';
import { products } from '../../../data/Products';

const ProductsSection = ({
  ProductsType = null,
  category = null,
  badgeType = null,
  layout = 3,
  page = 1,
  productsPerPage = 8,
  sortedFilteredProducts = [],
}) => {

  // Apply filters on the sortedFilteredProducts passed from parent
  const filteredProducts = sortedFilteredProducts.filter(product => {
    // Filter by badge type (e.g., "sale")
    if (badgeType != null) return product.badgeType === badgeType;

    // Featured filter
    if (ProductsType && ProductsType.toLowerCase() === 'featured') return product.isFeatured;

    // Category filter
    if (category) return product.category.toLowerCase() === category.toLowerCase();

    return true; // if no filters, keep product
  });

  // Pagination logic
  const startIndex = (page - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const productsToRender = paginatedProducts;
  const productNotFound = productsToRender.length === 0;
  return (
     <section className="product-container">
    <div className="products">
      <div className={`product-grid product-grid-${layout}`}>
        {productsToRender.length > 0 &&
          productsToRender.map(product => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))
        }
      </div>
    </div>

    {productNotFound && (
      <div className="no-products">
        <img
          src="./assets/images/products/product_not_found.png"
          alt="Product not found"
          className="no-products-img"
        />
        <p>No products found</p>
      </div>
    )}
  </section>
  );
};

export default ProductsSection;
