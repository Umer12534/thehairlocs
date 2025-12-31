import React from 'react'
import ProductCard from '../../ui/ProductCard/ProductCard'
import { Link } from 'react-router-dom';
import './ProductsSection.css'

const ProductsSection = ({featuredCardproducts = []}) => {
    return (
        <>
        <section className="product-container">
                <div className="products">
                    <div className="product-grid">
                        {featuredCardproducts.map(product => (
                            <ProductCard
                                key={product.id}
                                {...product} // passes image, name, price, oldPrice, likes as props
                            />
                        ))}
                    </div>
                    
                    <div className="product-btn-div">
                        <Link to={"/Categories"} className="Product-btn" >EXPLORE ALL PRODUCTS </Link>
                    </div>
                </div>
        </section>
        </>
    )
}

export default ProductsSection
