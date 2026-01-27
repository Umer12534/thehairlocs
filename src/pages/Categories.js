import React, { useEffect, useState } from "react";
import Pageheader from "../components/ui/pageheader/Pageheader";
import FilterTabs from "../components/ui/filterTabs/FilterTabs";
import AllCategoriesSection from "../components/sections/allcategoriessection/AllCategoriesSection";
import ProductsSection from "../components/sections/ProductsSection/ProductsSection";
import Heading from "../components/ui/heading/Heading";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const categories = [
  { name: "All Categories", sectionId: "all" },
  { name: "Oils", sectionId: "Oils" },
  { name: "Moisturizers", sectionId: "Moisturizers" },
  { name: "Shampoos", sectionId: "Shampoos" },
  { name: "Conditioners", sectionId: "Conditioners" },
  { name: "Styling", sectionId: "Styling" },
  { name: "Serums", sectionId: "Serums" },
];

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "products"));

        const fetchedProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Pageheader
        title="Categories"
        des="Discover our premium collection of hair care products"
        image="/assets/images/categories/hero.jpg"
      />

      <FilterTabs categories={categories} />

      {categories.map((cat, index) => {
        //  Filter products for this category
        const categoryProducts =
          cat.name === "All Categories"
            ? []
            : products.filter(
                product =>
                  product.category?.toLowerCase() ===
                  cat.name.toLowerCase()
              );

        //  Skip category if no products AND not loading
        if (cat.name !== "All Categories" && !loading && categoryProducts.length === 0) {
          return null;
        }

        return (
          <section
            key={index}
            id={cat.sectionId}
            style={{ scrollMarginTop: "150px" }}
          >
            {/* All Categories */}
            {cat.name === "All Categories" && (
              <>
                <Heading heading_text={cat.name} position="left" />
                <AllCategoriesSection />
              </>
            )}

            {/* Product Categories */}
            {cat.name !== "All Categories" && (
              <>
                <Heading heading_text={cat.name} position="left" />
                <ProductsSection
                  category={cat.name}
                  sortedFilteredProducts={products}
                  layout={4}
                  loading={loading}
                />
              </>
            )}
          </section>
        );
      })}
    </>
  );
};

export default Categories;
