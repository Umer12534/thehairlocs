import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import "../styles/admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ToastMessage from "../components/ui/toastMessage/ToastMessage";
import Button from "../components/ui/button/Button";

const ManageCategories = () => {
  
  // toast Message state
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [categories, setCategories] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const categoryRef = collection(db, "Category");

  const fetchCategories = async () => {
    const snapshot = await getDocs(categoryRef);
    setCategories(
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await addDoc(categoryRef, {
        name,
        description,
        createdAt: serverTimestamp(),
      });

      setToastType("success");
      setToastMessage("Category added successfully ");

      await fetchCategories();
      setName("");
      setDescription("");
      setShowAdd(false); 
    } catch (err) {
      setToastType("error");
      setToastMessage("Failed to add category ");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await deleteDoc(doc(db, "Category", id));
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
    <div className="admin-page">

      {/* HEADER */}
      <div className="admin-header">
        <h1>Categories</h1>
        <Button position="right" onClick={() => setShowAdd(true)} marginbottom={0}>Add Category</Button>
      </div>

      {/* ===== CATEGORY LIST (z-index:1) ===== */}
      <div className="table-wrapper z-base">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length ? (
              categories.map((cat, i) => (
                <tr key={cat.id}>
                  <td>{i + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description || "-"}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== ADD CATEGORY OVERLAY  ===== */}

      {showAdd && (
        <div className="overlay">
          <div className="overlay-content">
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowAdd(false)}
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            
            <h2>Add Category</h2>

            <form onSubmit={handleAddCategory}>
              <div>
                <label htmlFor="category-name">Category Name</label>
                <input
                  id="category-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label htmlFor="category-description">Description</label>
                <textarea
                  id="category-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter category description (optional)"
                />
              </div>

              <div className="overlay-actions">
                <button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Adding...
                    </>
                  ) : (
                    "Add Category"
                  )}
                </button>
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setShowAdd(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

    <ToastMessage
      type={toastType}
      message={toastMessage}
      duration={3000}
      onClose={() => setToastMessage("")}
    />
    </>

  );
};

export default ManageCategories;
