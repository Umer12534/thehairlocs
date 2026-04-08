import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import "../styles/admin.css";
import Button from "../components/ui/button/Button";
import ToastMessage from "../components/ui/toastMessage/ToastMessage";
import OverlayForm from "../components/sections/overlayForm/OverlayForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const EMPTY_FORM = { name: "", description: "", image: "" };

const ManageCategories = () => {
  const navigate = useNavigate();
  const categoryRef = useMemo(() => collection(db, "Category"), []);

  /* =====================
     STATES
  ===================== */
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [formData, setFormData] = useState(EMPTY_FORM);

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
  const fetchCategories = useCallback(async () => {
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
  }, [categoryRef]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

      setFormData(EMPTY_FORM);
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
     OPEN EDIT FORM
  ===================== */
  const handleOpenEdit = (cat) => {
    setEditingId(cat.id);
    setFormData({
      name: cat.name || "",
      description: cat.description || "",
      image: cat.image || "",
    });
    setShowEdit(true);
  };

  /* =====================
     EDIT CATEGORY
  ===================== */
  const handleEditCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const categoryDoc = doc(db, "Category", editingId);
      await updateDoc(categoryDoc, {
        ...formData,
        updatedAt: serverTimestamp(),
      });

      setToastType("success");
      setToastMessage("Category updated successfully");

      setFormData(EMPTY_FORM);
      setEditingId(null);
      setShowEdit(false);
      fetchCategories();
    } catch (error) {
      setToastType("error");
      setToastMessage("Failed to update category");
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
      <td><div className="skeleton skeleton-text"></div></td>
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
              onClick={() => {
                setFormData(EMPTY_FORM);
                setShowAdd(true);
              }}
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
                  <tr 
                    key={cat.id} 
                    onClick={() => {
                      if(window.innerWidth < 768){
                        navigate(`/admin/mange-categories/${encodeURIComponent(cat.name)}`)
                      }
                    }}
                    onDoubleClick={() => navigate(`/admin/mange-categories/${encodeURIComponent(cat.name)}`)}
                    style={{ cursor: "pointer" }}
                    title="Double-click to view products in this category"
                  >
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
                    <td className="action-cell">
                      <div className="action-buttons">
                        <button
                          className="btn-edit"
                          onClick={() => handleOpenEdit(cat)}
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faPen} />
                          <span>Edit</span>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(cat.id)}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          <span>Delete</span>
                        </button>
                      </div>
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

        {/* ADD OVERLAY FORM */}
        {showAdd && (
          <OverlayForm
            title="Add Category"
            fields={categoryFields}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleAddCategory}
            onClose={() => {
              setShowAdd(false);
              setFormData(EMPTY_FORM);
            }}
            loading={loading}
            submitText="Add Category"
          />
        )}

        {/* EDIT OVERLAY FORM */}
        {showEdit && (
          <OverlayForm
            title="Edit Category"
            fields={categoryFields}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleEditCategory}
            onClose={() => {
              setShowEdit(false);
              setFormData(EMPTY_FORM);
              setEditingId(null);
            }}
            loading={loading}
            submitText="Save Changes"
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
