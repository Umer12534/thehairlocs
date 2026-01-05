import React from 'react'
import ProductCard from '../../ui/ProductCard/ProductCard'
import { Link } from 'react-router-dom';
import './ProductsSection.css'
import { products } from '../../../data/Products';

const ProductsSection = ({ ProductsType= null, category= null, badgeType= null, layout= 3, page, productsPerPage}) => {
    const filteredProducts = products.filter(product => {

        // Filter by badge type first (e.g., "sale")
        if (badgeType != null) {
            return product.badgeType === badgeType;
        }
        
        
        // Featured filter
        if(ProductsType && ProductsType.toLowerCase() === "featured"){
            return product.isFeatured;
        }
        
        // Category filter
        if (category) {
            return product.category.toLowerCase() === category.toLowerCase();
        }
        
        return true; // if no type or category, show all products
    })

    const startIndex = (page - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );
    const hasPagination = page && productsPerPage;
    const productsToRender = hasPagination
    ? paginatedProducts
    : filteredProducts;

    return (
        <>
        <section className="product-container">
            <div className="products">
                <div className={`product-grid product-grid-${layout}`}>
                    
                    {productsToRender.length > 0 ? (
                        productsToRender.map(product => (
                            <ProductCard
                                key={product.id}
                                {...product} // passes image, name, price, oldPrice, likes as props
                            />
                        ))
                    ) : (
                        <div className="">
                            <p>No products found.</p> 
                            <p>Debug info: Total products in data: {products.length}</p>
                            <p>Filters applied: badgeType={badgeType}, ProductsType={ProductsType}, category={category}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
        </>
    )
}

export default ProductsSection
