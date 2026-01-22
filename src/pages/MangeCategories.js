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
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ManageCategories = () => {
  const categoryRef = collection(db, "Category");

  const [categories, setCategories] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // 🔹 Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  // 🔹 Field configuration (reusable)
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

  // 🔹 Fetch categories
  const fetchCategories = async () => {
    setLoadingCategories(true);
    const snapshot = await getDocs(categoryRef);
    setCategories(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
    setLoadingCategories(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔹 Add category
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
    }

    setLoading(false);
  };

  // 🔹 Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await deleteDoc(doc(db, "Category", id));
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // 🔹 Skeleton row
  const SkeletonRow = () => (
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-image"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-icon"></div></td>
    </tr>
  );

  return (
    <>
      <div className="admin-page">
        <div className="admin-header">
          <h1>Categories</h1>
          <Button
            onClick={() => setShowAdd(true)}
            margintop={0}
            marginbottom={0}
            position="right"
          >
            Add Category
          </Button>
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
              ) : categories.length ? (
                categories.map((cat, i) => (
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
