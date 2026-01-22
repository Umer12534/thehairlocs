import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

import Button from "../components/ui/button/Button";
import "../styles/admin.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const EditProduct = ({ productId, onClose, refetchProducts, showToast }) => {
    const productRef = doc(db, "products", productId);
    const categoryRef = collection(db, "Category");

    // Basic fields
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState(["", "", ""]);

    // Status
    const [status, setStatus] = useState("active");

    // Sizes
    const [sizes, setSizes] = useState([{ size: "", price: "", stock: "" }]);

    // Sale fields
    const [isOnSale, setIsOnSale] = useState(false);
    const [salePercentage, setSalePercentage] = useState("");

    // Badges
    const [isNewArrival, setIsNewArrival] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);

    // UI
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const snap = await getDoc(productRef);
                if (!snap.exists()) return;

                const data = snap.data();

                setName(data.name);
                setCategory(data.category);
                setDescription(data.description || "");
                setImages([
                    data.images?.[0] || "",
                    data.images?.[1] || "",
                    data.images?.[2] || "",
                ]);

                setStatus(data.status || "active");
                setIsOnSale(data.sale?.isOnSale || false);
                setSalePercentage(
                    data.sale?.percentage ? String(data.sale.percentage) : ""
                );
                setIsNewArrival(data.isNewArrival || false);
                setIsFeatured(data.isFeatured || false);

                const sizeArray = Object.entries(data.sizes || {}).map(
                    ([key, value]) => ({
                        size: key,
                        price: value.price,
                        stock: value.stock,
                    })
                );
                setSizes(sizeArray.length ? sizeArray : [{ size: "", price: "", stock: "" }]);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        fetchProduct();
    }, [productId]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            const snap = await getDocs(categoryRef);
            setCategories(
                snap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        };
        fetchCategories();
    }, []);

    // Handlers
    const handleAddSize = () => setSizes([...sizes, { size: "", price: "", stock: "" }]);
    const handleRemoveSize = (index) => setSizes(sizes.filter((_, i) => i !== index));
    const handleSizeChange = (index, field, value) => {
        const updated = [...sizes];
        updated[index][field] = value;
        setSizes(updated);
    };
    const handleImageChange = (index, value) => {
        const updated = [...images];
        updated[index] = value;
        setImages(updated);
    };

    // Submit update
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

        const filteredImages = images.filter((img) => img.trim() !== "");
        if (!filteredImages.length) {
            showToast("Main product image is required", "error");
            return;
        }

        try {
            setLoading(true);

            await updateDoc(productRef, {
                name,
                category,
                description,
                images: filteredImages,
                status,
                sizes: sizesObj,
                sale: { isOnSale, percentage: isOnSale ? Number(salePercentage) : 0 },
                isNewArrival,
                isFeatured,
            });

            showToast("Product updated successfully!");
            refetchProducts();
            onClose();
        } catch (err) {
            console.error(err);
            showToast("Error updating product", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page">
            <h1>Edit Product</h1>

            <form className="add-product-form" onSubmit={handleSubmit}>
                {/* BASIC FIELDS */}
                {/* .add-product-form input[type="text"] */}
                <div className="form-group">
                    <label>Product Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" />

                    <label>Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" />

                    <label>Product Images</label>
                    {images.map((img, i) => (
                        <input
                            key={i}
                            value={img}
                            placeholder={`Image ${i + 1}`}
                            onChange={(e) => handleImageChange(i, e.target.value)}
                            type="text"
                        />
                    ))}

                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {/* SIZES */}
                <div className="form-group">
                    <label>Sizes</label>
                    {sizes.map((s, i) => (
                        <div key={i} className="product-size-row">
                            <select value={s.size} onChange={(e) => handleSizeChange(i, "size", e.target.value)}>
                                <option value="">Select Size</option>
                                <option value="50ml">50ml</option>
                                <option value="100ml">100ml</option>
                                <option value="150ml">150ml</option>
                            </select>

                            <input type="number" placeholder="Price" value={s.price} onChange={(e) => handleSizeChange(i, "price", e.target.value)} />
                            <input type="number" placeholder="Stock" value={s.stock} onChange={(e) => handleSizeChange(i, "stock", e.target.value)} />

                            {sizes.length > 1 && (
                                <button type="button" className="btn-remove" onClick={() => handleRemoveSize(i)}>Remove</button>
                            )}
                        </div>
                    ))}
                    <Button type="button" variant="green" onClick={handleAddSize}>
                        <FontAwesomeIcon icon={faPlus} /> Add Size
                    </Button>
                </div>

                {/* STATUS RADIO BUTTONS */}
                <div className="form-group">
                    <label>Status</label>
                    <div className="radio-group">
                        <label>
                            <input type="radio" value="active" checked={status === "active"} onChange={() => setStatus("active")} />
                            Active
                        </label>
                        <label>
                            <input type="radio" value="inactive" checked={status === "inactive"} onChange={() => setStatus("inactive")} />
                            Inactive
                        </label>
                    </div>
                </div>

                {/* SALE CHECKBOX & PERCENTAGE */}
                <div className="form-group">
                    <label>
                        <input type="checkbox" checked={isOnSale} onChange={(e) => setIsOnSale(e.target.checked)} />
                        On Sale
                    </label>

                    {isOnSale && (
                        <select value={salePercentage} onChange={(e) => setSalePercentage(e.target.value)}>
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
                </div>

                {/* FEATURED / NEW ARRIVAL */}
                <div className="form-group">
                    <label>
                        <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                        Featured
                    </label>
                    <label>
                        <input type="checkbox" checked={isNewArrival} onChange={(e) => setIsNewArrival(e.target.checked)} />
                        New Arrival
                    </label>
                </div>

                <Button type="submit" size="lg" fullWidth disabled={loading}>
                    {loading ? "Updating..." : "Update Product"}
                </Button>
            </form>
        </div>
    );
};

export default EditProduct;
