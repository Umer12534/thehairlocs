import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

import Pageheader from "../components/ui/pageheader/Pageheader";
import ProductsSection from "../components/sections/ProductsSection/ProductsSection";
import FilterBar from "../components/ui/filterbar/FilterBar";
import FilterSidebar from "../components/ui/filtersidebar/FilterSidebar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import "../styles/Global.css";

function Sale() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState({
    categories: {},
    price: { min: null, max: null },
    availability: { inStock: false, outOfStock: false },
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

        setProducts(fetchedProducts);
        setSortedProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // ✅ Sorting
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
    let filtered = [...sortedProducts];

    // CATEGORY FILTER
    const activeCategories = Object.keys(filter.categories || {}).filter(
      (key) => filter.categories[key]
    );

    if (activeCategories.length > 0) {
      filtered = filtered.filter((product) =>
        activeCategories.includes(product.category?.toLowerCase())
      );
    }

    // PRICE FILTER
    if (filter.price) {
      filtered = filtered.filter((product) => {
        const minPrice = Math.min(
          ...Object.values(product.sizes || {}).map((s) => s.price)
        );

        const minOk =
          filter.price.min == null || minPrice >= filter.price.min;
        const maxOk =
          filter.price.max == null || minPrice <= filter.price.max;

        return minOk && maxOk;
      });
    }

    // AVAILABILITY FILTER
    if (filter.availability?.inStock) {
      filtered = filtered.filter((product) =>
        Object.values(product.sizes || {}).some((s) => s.stock > 0)
      );
    }

    setFilteredProducts(filtered);
    setPage(1);
  }, [filter, sortedProducts]);

  // ✅ Only Sale Products
  const saleProducts = filteredProducts.filter(
    (product) => product.sale?.isOnSale === true
  );

  const totalPages = Math.ceil(
    saleProducts.length / PRODUCTS_PER_PAGE
  );

  // ✅ Skeleton Loader Component
  const ProductSkeleton = () => (
    <div className="product-skeleton-card">
      <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
      <div className="skeleton-content">
        <Skeleton variant="text" width="80%" height={30} animation="wave" />
        <Skeleton variant="text" width="60%" height={20} animation="wave" />
        <Skeleton variant="text" width="40%" height={25} animation="wave" />
        <div className="skeleton-price">
          <Skeleton variant="text" width="30%" height={30} animation="wave" />
          <Skeleton variant="text" width="20%" height={20} animation="wave" />
        </div>
      </div>
    </div>
  );

  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < PRODUCTS_PER_PAGE; i++) {
      skeletons.push(<ProductSkeleton key={i} />);
    }
    return skeletons;
  };

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
      />

      <div className="page-content-filterbar-sidebar">
        <div className={`filtersidebar ${isSidebarActive ? "active" : ""}`}>
          <FilterSidebar
            toggleSidebar={toggleSidebar}
            setFilter={setFilter}
          />
        </div>

        {loading ? (
          <div className={`products-section layout-${isLayout}`}>
            {renderSkeletons()}
          </div>
        ) : (
          <ProductsSection
            layout={isLayout}
            page={page}
            productsPerPage={PRODUCTS_PER_PAGE}
            sortedFilteredProducts={saleProducts}
          />
        )}
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