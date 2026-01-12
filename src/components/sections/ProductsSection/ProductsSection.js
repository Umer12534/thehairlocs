import React from 'react';
import ProductCard from '../../ui/ProductCard/ProductCard';
import './ProductsSection.css';

const ProductsSection = ({
  ProductsType = null,
  category = null,
  badgeType = null,
  layout = 3,
  page = 1,
  productsPerPage = 8,
  sortedProducts = [],
}) => {

  // Apply filters on the sortedProducts passed from parent
  const filteredProducts = sortedProducts.filter(product => {
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

  return (
    <section className="product-container">
      <div className="products">
        <div className={`product-grid product-grid-${layout}`}>
          {productsToRender.length > 0 ? (
            productsToRender.map(product => (
              <ProductCard
                key={product.id}
                {...product} // passes name, images, price, salePrice, likes, etc.
              />
            ))
          ) : (
            <div className="no-products">
              <p>No products found.</p>
              <p>Debug info: Total sorted products: {sortedProducts.length}</p>
              <p>Filters applied: badgeType={badgeType}, ProductsType={ProductsType}, category={category}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
