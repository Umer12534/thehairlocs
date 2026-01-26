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
import Button from "../components/ui/button/Button";
import ToastMessage from "../components/ui/toastMessage/ToastMessage";
import OverlayForm from "../components/sections/overlayForm/OverlayForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

const ManageCategories = () => {
  const categoryRef = collection(db, "Category");

  /* =====================
     STATES
  ===================== */
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  /* =====================
     FORM FIELDS
  ===================== */
  const categoryFields = [
    {
      name: "name",
      label: "Category Name",
      type: "text",
      placeholder: "Enter category name",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description (optional)",
    },
    {
      name: "image",
      label: "Image URL",
      type: "text",
      placeholder: "Paste image link",
    },
  ];

  /* =====================
     FETCH CATEGORIES
  ===================== */
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);

      const snapshot = await getDocs(categoryRef);
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setCategories(data);
      setFilteredCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* =====================
     SEARCH FILTER
  ===================== */
  useEffect(() => {
    if (!search.trim()) {
      setFilteredCategories(categories);
      return;
    }

    const lowerSearch = search.toLowerCase();

    const filtered = categories.filter(
      (cat) =>
        cat.name?.toLowerCase().includes(lowerSearch) ||
        cat.description?.toLowerCase().includes(lowerSearch)
    );

    setFilteredCategories(filtered);
  }, [search, categories]);

  /* =====================
     ADD CATEGORY
  ===================== */
  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(categoryRef, {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setToastType("success");
      setToastMessage("Category added successfully");

      setFormData({ name: "", description: "", image: "" });
      setShowAdd(false);
      fetchCategories();
    } catch (error) {
      setToastType("error");
      setToastMessage("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  /* =====================
    DELETE CATEGORY
  ===================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    await deleteDoc(doc(db, "Category", id));
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setFilteredCategories((prev) => prev.filter((c) => c.id !== id));
  };

  /* =====================
     SKELETON ROW
  ===================== */
  const SkeletonRow = () => (
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-image"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-icon"></div></td>
    </tr>
  );

  /* =====================
     UI
  ===================== */
  return (
    <>
      <div className="admin-page">
        {/* HEADER */}
        <div className="admin-header">
          <h1>Categories</h1>

          <div className="admin-actions">
            <div className="search-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search categories..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button
              variant="green"
              onClick={() => setShowAdd(true)}
              margintop={0}
              marginbottom={0}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Category
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loadingCategories ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : filteredCategories.length ? (
                filteredCategories.map((cat, i) => (
                  <tr key={cat.id}>
                    <td>{i + 1}</td>

                    <td>
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="table-image"
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>{cat.name}</td>
                    <td>{cat.description || "-"}</td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(cat.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* OVERLAY FORM */}
        {showAdd && (
          <OverlayForm
            title="Add Category"
            fields={categoryFields}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleAddCategory}
            onClose={() => setShowAdd(false)}
            loading={loading}
            submitText="Add Category"
          />
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
