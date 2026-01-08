import React, { useState } from "react";
import "./ProductDetails.css";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useParams } from "react-router-dom";
import { products } from "../data/Products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlug, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/ui/button/Button';

function ProductDetails() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(1);

    const product = products.find(
        (item) => item.id === Number(id)
    );
    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <>
        {/* Product */}
        <div className="product-wrapper">

            {/* Left — Images */}
            <div className="image-left">

                {/* Main Image */}
                <div className="main-img">
                    <img
                    src = {product.image[activeImage]}
                    // src={`/assets/images/sale-product (${activeImage}).jpg`}
                    alt="Product"
                    />
                </div>

                {/* Thumbnails */}
                <div className="thumbs">
                    {[0, 1, 2].map((img) => (
                    <button
                        key={img}
                        className={`thumb ${activeImage === img ? "active" : ""}`}
                        onClick={() => setActiveImage(img)}
                    >
                        <img
                        src={product.image[img]}
                        alt={`Thumbnail ${img}`}
                        />
                    </button>
                    ))}
                </div>
            </div>

            {/* Right — Product Info */}
            <div className="right">
            <h1>{product.name}</h1>

            <Stack spacing={1}>
                <Rating name="half-rating-read" value={product.rating} precision={0.5} readOnly />
            </Stack>

            {product.salePrice && (
                <div className="price">Rs. {product.salePrice}</div>
            )}

            <div className={`price ${product.salePrice ? "oldPrice" : ""}`}>
                Rs. {product.originalPrice}
            </div>


            <p className="desc">
                High-quality handmade loc extensions designed to give your hair a
                natural, fuller, voluminous look.
            </p>

            {/* Selection */}
            <div className="selection-box">

                {/* Size */}
                <div className="size-box">
                <label>Size</label>
                <div className="size">
                    <Button children="10ml" size="sm" margianbuttom = {0} />
                    <Button children="20ml" size="sm" margianbuttom = {0}/>
                    <Button children="30ml" size="sm" margianbuttom = {0}/>
                </div>
                </div>

                {/* Quantity */}
                <div className="quantity-box">
                <label>Quantity</label>
                <div className="qty-box">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                        <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)}>
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>

                    </button>
                </div>
                </div>
            </div>

            <Button children="Add to Cart" size="lg" fullWidth />
            </div>
        </div>

        {/* Questions */}
        <div className="questions">
            <details>
            <summary>
                Product Description <span className="arrow">⌄</span>
            </summary>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
                ex suscipit soluta maiores accusantium.
            </p>
            </details>

            <details>
            <summary>
                Return Policy <span className="arrow">⌄</span>
            </summary>
            <p>
                We offer a 30-day return policy for unused and unopened products.
            </p>
            </details>

            <details>
            <summary>
                Shipping Information <span className="arrow">⌄</span>
            </summary>
            <p>
                Orders are processed within 1–2 business days and delivered in 5–7
                working days.
            </p>
            </details>

            <details>
            <summary>
                Care Instructions <span className="arrow">⌄</span>
            </summary>
            <p>
                Store in a cool, dry place. Avoid direct sunlight and moisture.
            </p>
            </details>
        </div>

        {/* Related Products */}
        <section className="related-section">
            <h2>Related Products</h2>

            <div className="related-container">
            {[1, 2, 3].map((item) => (
                <div key={item} className="related-card">
                <div className="image-div">
                    <img
                    src="/assets/images/sale-product (5).jpg"
                    alt="Related product"
                    />
                </div>
                <h3>Premium Loc Extensions</h3>
                <p>Rs. 2,999</p>
                </div>
            ))}
            </div>
        </section>
        </>
    );
}

export default ProductDetails;
