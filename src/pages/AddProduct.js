import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";


import Button from "../components/ui/button/Button";
import "../styles/admin.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddProduct = ({feathedproducts, onClose, showToast}) => {
    const productsRef = collection(db, "products");
    const categoryRef = collection(db, "Category");

    //  Basic fields
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState(["", "", ""]);
    const [status, setStatus] = useState("active");

    //  Sizes
    const [sizes, setSizes] = useState([
        { size: "", price: "", stock: "" },
    ]);

    //  Sale fields
    const [isOnSale, setIsOnSale] = useState(false);
    const [salePercentage, setSalePercentage] = useState("");

    // Badge Fields
    const [isNewArrival, setIsNewArrival] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);

    // Like and rating
    const [likes, setLikes] = useState(0);
    const [rating, setRating] = useState(0.0);


    // UI state
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    //  Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const snapshot = await getDocs(categoryRef);
            setCategories(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            );
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
        };

        fetchCategories();
    }, []);

    //  Size handlers
    const handleAddSize = () => {
        setSizes([...sizes, { size: "", price: "", stock: "" }]);
    };

    const handleRemoveSize = (index) => {
        setSizes(sizes.filter((_, i) => i !== index));
    };

    const handleSizeChange = (index, field, value) => {
        const updated = [...sizes];
        updated[index][field] = value;
        setSizes(updated);
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...images];
        updatedImages[index] = value;
        setImages(updatedImages);
    };



    //  Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const sizesObj = {};
        sizes.forEach((s) => {
            if (s.size) {
            sizesObj[s.size] = {
                price: Number(s.price),
                stock: Number(s.stock),
            };
            }
        });

        if (!name || !category || !Object.keys(sizesObj).length) {
            showToast("Please fill all required fields", "error");
            return;
        }

        if (isOnSale && !salePercentage) {
            showToast("Please select sale percentage", "error");
            return;
        }

        const filteredImages = images.filter(img => img.trim() !== "");

        if (!filteredImages.length) {
            showToast("Main product image is required", "error");
            return;
        }

        try {
            setLoading(true);

            await addDoc(productsRef, {
            name,
            category,
            description,
            images: filteredImages,
            status,
            likes,
            rating,
            sizes: sizesObj,
            sale: {
                isOnSale,
                percentage: isOnSale ? Number(salePercentage) : 0,
            },
            isNewArrival,
            isFeatured,
            createdAt: Timestamp.now(),
            });

            showToast("Product added successfully!");

            feathedproducts();


            // Reset form
            setName("");
            setCategory("");
            setDescription("");
            setSizes([{ size: "", price: "", stock: "" }]);
            setImages(["", "", ""]);
            setIsOnSale(false);
            setSalePercentage("");
            setIsNewArrival(false);
            setIsFeatured(false);
            setStatus("active");
            onClose();


            // if (onProductAdded) onProductAdded();

        } catch (error) {
            console.error("Error adding product:", error);
            showToast("Error adding product", "error");
        } finally {
            setLoading(false);
        }
        };


    return (
        <div className="admin-page">
        <h1>Add New Product</h1>

        <form className="add-product-form" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="form-group">
                <label>Product Name</label>
                <input
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                
                <label>Product description</label>
                <input
                    type="text"
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <div className="form-group">
                    <label>Product Images</label>

                    <input
                        type="text"
                        placeholder="Enter product image link (Main Image)"
                        value={images[0]}
                        onChange={(e) => handleImageChange(0, e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Enter product image link (Optional)"
                        value={images[1]}
                        onChange={(e) => handleImageChange(1, e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Enter product image link (Optional)"
                        value={images[2]}
                        onChange={(e) => handleImageChange(2, e.target.value)}
                    />
                    </div>


                {/* Category */}
                <label>Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                        {c.name}
                    </option>
                    ))}
                </select>
            </div>

            {/* Sizes */}
            <div className="form-group">
            <label>Sizes, Price & Stock</label>
            
            {sizes.map((s, index) => (
                <div key={index} className="product-size-row">
                <select
                    value={s.size}
                    onChange={(e) =>
                    handleSizeChange(index, "size", e.target.value)
                    }
                    required
                >
                    <option value="">Select Size</option>
                    <option value="50ml">50ml</option>
                    <option value="100ml">100ml</option>
                    <option value="150ml">150ml</option>
                </select>

                <input
                    type="number"
                    placeholder="Price"
                    value={s.price}
                    onChange={(e) =>
                    handleSizeChange(index, "price", e.target.value)
                    }
                    required
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={s.stock}
                    onChange={(e) =>
                    handleSizeChange(index, "stock", e.target.value)
                    }
                    required
                />

                {sizes.length > 1 && (
                    <button
                    type="button"
                    className="btn-remove"
                    onClick={() => handleRemoveSize(index)}
                    >
                    Remove
                    </button>
                )}
                </div>
            ))}

            <Button type="button" variant="green" onClick={handleAddSize}  margintop={0} marginbottom={0}>
                <FontAwesomeIcon icon={faPlus} /> Add Size
            </Button>
            </div>

            {/*  SALE SECTION */}
            <div className="form-group">
                <label className="checkbox-label">
                    <input
                    type="checkbox"
                    checked={isOnSale}
                    onChange={(e) => setIsOnSale(e.target.checked)}
                    />
                    This product is on sale
                </label>

                {isOnSale && (
                    <select
                    value={salePercentage}
                    onChange={(e) => setSalePercentage(e.target.value)}
                    required
                    >
                    <option value="">Select Sale Percentage</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="25">25%</option>
                    <option value="30">30%</option>
                    <option value="40">40%</option>
                    <option value="50">50%</option>
                    </select>
                )}
                
                <label className="checkbox-label">
                    <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                    This product is featured
                </label>

                <label className="checkbox-label">
                    <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    />
                    This product is new arrival
                </label>
            </div>

            {/* Submit */}
            <Button type="submit" size="lg" fullWidth disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
            </Button>
        </form>

        
        </div>
    );
};

export default AddProduct;
