import React from 'react'
import ProductCard from '../../ui/ProductCard/ProductCard'
import { Link } from 'react-router-dom';
import './ProductsSection.css'
import { products } from '../../../data/Products';

const ProductsSection = ({ ProductsType= null, category= null, badgeType= null }) => {
    const filteredProducts = products.filter(product => {
        // if (badgeType != null){
        //     return product.badgeType === badgeType
        // }

        // Featured filter
        if(ProductsType && ProductsType.toLowerCase() === "featured"){
            return product.isFeatured 
        }
        if (category) {
            return product.category.toLowerCase() === category.toLowerCase()
        }
        
        return true // if no type or category, show all products
    })
    return (
        <>
        <section className="product-container">
            <div className="products">
                <div className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                {...product} // passes image, name, price, oldPrice, likes as props
                            />
                        ))
                    ) : (
                        <p>No products found.</p> 
                    )}
                </div>
            </div>
        </section>
        </>
    )
}

export default ProductsSection
