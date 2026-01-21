import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import ToastMessage from "../components/ui/toastMessage/ToastMessage"; 
import Button from "../components/ui/button/Button";
import "../styles/admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [sizes, setSizes] = useState([{ size: "", price: "", stock: "" }]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "success" }); 
    const [categorys, setCategorys] = useState([]);

    const productsRef = collection(db, "products");
    const collectionCategoryRef = collection(db, "Category");

    // Fetch categories from Firestore
    useEffect(() => {
        const getCategory = async () => {
        try {
            const snapshot = await getDocs(collectionCategoryRef);
            const categorysData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setCategorys(categorysData);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
        };
        getCategory();
    }, []);

    // Add a new size field
    const handleAddSize = () => {
        setSizes([...sizes, { size: "", price: "", stock: "" }]);
    };

    // Remove a size field
    const handleRemoveSize = (index) => {
        const newSizes = sizes.filter((_, i) => i !== index);
        setSizes(newSizes);
    };

    // Update a specific size field
    const handleSizeChange = (index, field, value) => {
        const newSizes = [...sizes];
        newSizes[index][field] = value;
        setSizes(newSizes);
    };

    // Function to show toast
    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    // Handle form submit
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

        if (!name || !category || Object.keys(sizesObj).length === 0) {
        showToast("Please fill all required fields", "error");
        return;
        }

        try {
        setLoading(true);
        await addDoc(productsRef, {
            name,
            category,
            sizes: sizesObj,
            createdAt: Timestamp.now(),
        });
        showToast("Product added successfully!", "success");
        setName("");
        setCategory("");
        setSizes([{ size: "", price: "", stock: "" }]);
        } catch (err) {
        console.error("Error adding product:", err);
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
            />
            </div>

            {/* Category Select */}
            <div className="form-group">
            <label>Category</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Select Category</option>
                {categorys.map((c) => (
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

                <select name="" id="" value={s.size} onChange={(e) => handleSizeChange(index, "size", e.target.value)} required className="product-size-select">
                    <option value="">
                        Select Size
                    </option>
                    <option value="50ml">
                        50ml
                    </option>
                    <option value="100ml">
                        100ml
                    </option>
                    <option value="150ml">
                        150ml
                    </option>
                </select>

                <input
                    type="number"
                    placeholder="Price"
                    value={s.price}
                    onChange={(e) => handleSizeChange(index, "price", e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={s.stock}
                    onChange={(e) => handleSizeChange(index, "stock", e.target.value)}
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

            <Button type="button" fullWidth variant="green" onClick={handleAddSize}>
                <FontAwesomeIcon icon={faPlus} /> Add Size    
            </Button>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={loading} size="lg" fullWidth>
            {loading ? "Adding..." : "Add Product"}
            </Button>
        </form>

        {/* Toast Message */}
        <ToastMessage
            message={toast.message}
            type={toast.type}
            duration={3000}
            onClose={() => setToast({ message: "", type: "success" })}
        />
        </div>
    );
};

export default AddProduct;
