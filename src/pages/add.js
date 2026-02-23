import React from "react";
import { collection, writeBatch, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { testCategories } from "../testCategories";
import { testProducts } from "../testCategories";

const Add = () => {

  // 🔹 Upload Categories
  const uploadCategories = async () => {
    try {
      const batch = writeBatch(db);

      testCategories.forEach((category) => {
        const docRef = doc(db, "Category", category.name.toLowerCase());

        batch.set(docRef, {
          ...category,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          isActive: true,
        });
      });

      await batch.commit();
      alert("✅ Categories uploaded successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Upload Products
  const uploadProducts = async () => {
    try {
      const batch = writeBatch(db);

      testProducts.forEach((product) => {
        const docRef = doc(collection(db, "products"));

        batch.set(docRef, {
          ...product,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          isActive: true,
        });
      });

      await batch.commit();
      alert("✅ Products uploaded successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={uploadCategories}>
        Upload 5 Test Categories
      </button>

      <br /><br />

      <button onClick={uploadProducts}>
        Upload 5 Test Products
      </button>
    </>
  );
};

export default Add;