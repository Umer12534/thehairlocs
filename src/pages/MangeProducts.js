import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "../styles/admin.css";
import AddProduct from "./AddProduct";
import Button from "../components/ui/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faTimes, 
  faSearch, 
  faEdit, 
  faTrash,
  faBox,
  faTags,
  faMoneyBillWave,
  faWarehouse
} from "@fortawesome/free-solid-svg-icons";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const collectionRef = collection(db, "products");

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collectionRef);
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search filter
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteDoc(doc(db, "products", id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Error deleting product. Please try again.");
    }
  };



  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="admin-header">
        <h1>Manage Products</h1>

        <div className="admin-actions">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search products or categories..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button
            variant="green"
            onClick={() => setShowAddForm(true)}
            margintop={0}
            marginbottom={0}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Product
          </Button>
        </div>
      </div>

      

      {/* ADD PRODUCT OVERLAY */}
      <div className={`add-product-overlay ${showAddForm ? 'active' : ''}`}>
        <div className="overlay-content">
          <div className="overlay-header">
            <h2>Add New Product</h2>
            <button
              className="close-overlay"
              onClick={() => setShowAddForm(false)}
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="overlay-body">
            <AddProduct 
              onProductAdded={() => {
                fetchProducts();
                setShowAddForm(false);
              }} 
              onClose={() => setShowAddForm(false)}
            />
          </div>
        </div>
      </div>

      {/* PRODUCT TABLE */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price (PKR)</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="skeleton-row">
                  <td><div className="skeleton skeleton-text small" /></td>
                  <td>
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text tiny" />
                  </td>
                  <td><div className="skeleton skeleton-pill" /></td>
                  <td><div className="skeleton skeleton-text" /></td>
                  <td><div className="skeleton skeleton-text" /></td>
                  <td><div className="skeleton skeleton-pill" /></td>
                  <td>
                    <div className="skeleton skeleton-button" />
                  </td>
                </tr>
              ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => {
                const sizes = product.sizes || {};
                const sizeKeys = Object.keys(sizes);
                const totalProductStock = Object.values(sizes).reduce(
                  (sum, size) => sum + (size.stock || 0), 0
                );
                const status = totalProductStock > 0 ? "In Stock" : "Out of Stock";

                return (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="product-name-cell">
                        {product.name}
                      </div>
                      {product.description && (
                        <span className="product-description">
                          {product.description.substring(0, 50)}...
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="category-badge">
                        {product.category}
                      </span>
                    </td>

                    <td>
                      {sizeKeys.length > 0 ? (
                        sizeKeys.map((size) => (
                          <span key={size} className="size-row">
                            <span className="size-label">{size}:</span> 
                            <span className="price-value">
                              Rs {sizes[size].price?.toLocaleString()}
                            </span>
                          </span>
                        ))
                      ) : (
                        <span>-</span>
                      )}
                    </td>

                    <td>
                      {sizeKeys.length > 0 ? (
                        sizeKeys.map((size) => {
                          const stock = sizes[size].stock || 0;
                          const stockClass = stock > 5 ? 'stock-high' : stock > 0 ? 'stock-low' : 'stock-out';
                          return (
                            <span key={size} className="size-row">
                              <span className="size-label">{size}:</span> 
                              <span className={`stock-value ${stockClass}`}>
                                {stock}
                              </span>
                            </span>
                          );
                        })
                      ) : (
                        <span>-</span>
                      )}
                    </td>

                    <td>
                      <span className={`status-badge ${
                        status === "In Stock" ? 'status-in-stock' : 'status-out-of-stock'
                      }`}>
                        {status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button className="btn-edit">
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="no-data-cell">
                  <div className="no-data-content">
                    No products found
                  </div>
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="clear-search-btn"
                    >
                      Clear Search
                    </button>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;