import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

import Pageheader from "../components/ui/pageheader/Pageheader";
import ProductsSection from "../components/sections/ProductsSection/ProductsSection";
import FilterBar from "../components/ui/filterbar/FilterBar";
import FilterSidebar from "../components/ui/filtersidebar/FilterSidebar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "../styles/Global.css";

function Sale() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState({
    categories: {
      moisturizers: false,
      Oils: false,
      shampoos: false,
      conditioners: false,
      styling: false,
      Serums: false,
    },
    price: { min: 0, max: 10000 },
    availability: { inStock: false, outOfStock: false },
    hairType: {
      dry: false,
      oily: false,
      damaged: false,
      curly: false,
      straight: false,
    },
  });

  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8;
  const [isLayout, setLayout] = useState(3);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive((prev) => !prev);
  };

  const layoutSwitch = (layoutgrid) => {
    setLayout(layoutgrid);
  };

  // ✅ Fetch Products From Firestore with Loading State
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const collectionRef = collection(db, "products");
        const data = await getDocs(collectionRef);

        const fetchedProducts = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // Filter only sale products from the start
        const saleOnlyProducts = fetchedProducts.filter(
          (product) => product.sale?.isOnSale === true
        );

        setProducts(saleOnlyProducts);
        setSortedProducts(saleOnlyProducts);
        setFilteredProducts(saleOnlyProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  //  Sorting
  useEffect(() => {
    let sorted = [...products];

    const getMinPrice = (product) => {
      if (!product.sizes) return 0;
      return Math.min(
        ...Object.values(product.sizes).map((s) => s.price)
      );
    };

    switch (sortOption) {
      case "priceLowHigh":
        sorted.sort((a, b) => getMinPrice(a) - getMinPrice(b));
        break;
      case "priceHighLow":
        sorted.sort((a, b) => getMinPrice(b) - getMinPrice(a));
        break;
      case "nameAZ":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setSortedProducts(sorted);
  }, [sortOption, products]);

  // ✅ Filtering
  useEffect(() => {
    if (loading || !sortedProducts.length) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...sortedProducts];

    // CATEGORY FILTER
    const activeCategories = Object.keys(filter.categories || {}).filter(
      (key) => filter.categories[key]
    );

    if (activeCategories.length > 0) {
      filtered = filtered.filter((product) => {
        if (!product.category) return false;
        const productCategory = product.category.toLowerCase();
        return activeCategories.some(
          category => category.toLowerCase() === productCategory
        );
      });
    }

    // PRICE FILTER
    if (filter.price) {
      filtered = filtered.filter((product) => {
        if (!product.sizes) return false;
        
        const minPrice = Math.min(
          ...Object.values(product.sizes).map((s) => s.price)
        );

        const minOk =
          filter.price.min == null || minPrice >= filter.price.min;
        const maxOk =
          filter.price.max == null || minPrice <= filter.price.max;

        return minOk && maxOk;
      });
    }

    // AVAILABILITY FILTER
    if (filter.availability) {
      const { inStock, outOfStock } = filter.availability;

      if (inStock && !outOfStock) {
        // Show only products that have at least one size with stock > 0
        filtered = filtered.filter((product) => {
          if (!product.sizes) return false;
          return Object.values(product.sizes).some((s) => s.stock > 0);
        });
      } else if (!inStock && outOfStock) {
        // Show only products where all sizes have stock === 0
        filtered = filtered.filter((product) => {
          if (!product.sizes) return true; // No sizes means out of stock
          return Object.values(product.sizes).every((s) => s.stock === 0);
        });
      }
      // If both are checked or both are unchecked, show all products
    }

    // HAIR TYPE FILTER
    if (filter.hairType) {
      const activeHairTypes = Object.entries(filter.hairType)
        .filter(([key, value]) => value)
        .map(([key]) => key);

      if (activeHairTypes.length > 0) {
        filtered = filtered.filter(product =>
          Array.isArray(product.hairType)
            ? product.hairType.some(type => activeHairTypes.includes(type))
            : activeHairTypes.includes(product.hairType)
        );
      }
    }

    setFilteredProducts(filtered);
    setPage(1);
  }, [filter, sortedProducts, loading]);

  // ✅ Only Sale Products (already filtered at fetch)
  const saleProducts = filteredProducts;

  const totalPages = Math.ceil(
    saleProducts.length / PRODUCTS_PER_PAGE
  );

  return (
    <>
      <Pageheader
        title="Sale"
        des="Up to 50% off on premium products"
        image="/assets/images/sale/saleheader.jpg"
      />

        <FilterBar
          toggleSidebar={toggleSidebar}
          layoutSwitch={layoutSwitch}
          setSortOption={setSortOption}
          products={saleProducts}
          loading={loading}
        />

      <div className="page-content-filterbar-sidebar">
        <div className={`filtersidebar ${isSidebarActive ? "active" : ""}`}>
          <FilterSidebar
            toggleSidebar={toggleSidebar}
            setFilter={setFilter}
            loading={loading}
          />
        </div>

        <ProductsSection
          layout={isLayout}
          page={page}
          productsPerPage={PRODUCTS_PER_PAGE}
          sortedFilteredProducts={saleProducts}
          loading={loading}
        />
      </div>

      {!loading && saleProducts.length > 0 && (
        <div className="pagination-wrapper">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      )}
    </>
  );
}

export default Sale;
