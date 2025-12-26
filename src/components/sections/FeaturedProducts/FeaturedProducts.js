import React from 'react'
import ProductCard from '../../ui/ProductCard/ProductCard'
import { Link } from 'react-router-dom';
import { products } from '../../../data/Products';
import './FeaturedProducts.css'

const FeaturedProducts = () => {
    return (
        <>
        <section className="product-container">
                <div className="products">
                    <div className="title-section">
                        <h2>Featured Products</h2>
                    </div>

                    <div className="product-grid">
                        {products.map(product => (
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

export default FeaturedProducts
