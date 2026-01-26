import React from "react";
import ProductCard from "../../ui/ProductCard/ProductCard";
import "./ProductsSection.css";

const ProductsSection = ({
  ProductsType = null,      // featured
  category = null,          // "Shampoos"
  badgeType = null,         // sale | new
  layout = 3,
  page = 1,
  productsPerPage = 8,
  sortedFilteredProducts = [],
}) => {

  //  Apply filters according to DB fields
  const filteredProducts = sortedFilteredProducts.filter(product => {
    // Only show active products
    if (product.status !== "active") return false;

    // Badge filter
    if (badgeType === "sale") {
      return product.sale?.isOnSale === true;
    }

    if (badgeType === "new") {
      return product.isNewArrival === true;
    }

    // Products type filter
    if (ProductsType?.toLowerCase() === "featured") {
      return product.isFeatured === true;
    }

    // Category filter
    if (category) {
      return product.category?.toLowerCase() === category.toLowerCase();
    }

    return true;
  });

  // Pagination
  const startIndex = (page - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const productNotFound = paginatedProducts.length === 0;

  return (
    <section className="product-container">
      <div className="products">
        <div className={`product-grid product-grid-${layout}`}>
          {paginatedProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              image={product.images?.[0]}
              images={product.images}
              rating={product.rating}
              likes={product.likes}
              isFeatured={product.isFeatured}
              isNewArrival={product.isNewArrival}
              sale={product.sale}
              sizes={product.sizes}
              category={product.category}
            />
          ))}
        </div>
      </div>

      {productNotFound && (
        <div className="no-products">
          <img
            src="/assets/images/products/product_not_found.png"
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
