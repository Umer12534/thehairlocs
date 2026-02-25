import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Pageheader from '../components/ui/pageheader/Pageheader'
import FilterBar from '../components/ui/filterbar/FilterBar';
import FilterSidebar from '../components/ui/filtersidebar/FilterSidebar';
import ProductsSection from '../components/sections/ProductsSection/ProductsSection';
import Pagination from '@mui/material/Pagination';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../styles/Global.css'

function Products() {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get("search")?.trim().toLowerCase() || "";
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colectionRef = collection(db, "products");
  
  useEffect(() =>{
    const getProducts = async () => {
      try{
        setLoading(true);
        const data = await getDocs(colectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setProducts(filteredData);
        setError(null);
      } catch(err){
        console.error(err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [])


  const [sortedProducts, setSortedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  
  const [filter, setFilter] = useState({
    categories: {
      moisturizers: false,
      Oils: false,
      shampoos: false,
      conditioners: false,
      styling: false,
      Serums: false,
    },
    price: {
      min: null,
      max: null,
    },
    availability: {
      inStock: false,
      outOfStock: false,
    },
    hairType: {
      dry: false,
      oily: false,
      damaged: false,
      curly: false,
      straight: false,
    },
  });

  const getProductPrice = (product) => {
    if (!product?.sizes) return 0;

    // Convert sizes object to array
    const sizeList = Object.values(product.sizes);

    // Find the size with the minimum BASE price
    const minSize = sizeList.reduce((min, current) => {
      if (!min) return current;
      return current.price < min.price ? current : min;
    }, null);

    if (!minSize) return 0;

    // If min size has salePrice → use it, else use price
    return typeof minSize.salePrice === "number"
      ? minSize.salePrice
      : minSize.price;
  };


  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8;
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isLayout, setLayout] = useState(3);
    
  const toggleSidebar = () => {
    setIsSidebarActive(prev => !prev);
  }

  const layoutSwitch = (layoutgrid) => {
    setLayout(layoutgrid)
  }
    

  useEffect(() => {
    if (!loading) {
      setSortedProducts(products);
      setFilteredProducts(products);
    }
  }, [products, loading]);


  useEffect(() => {
    if (loading || !products.length) return;
    
    // Copy products array
    let sorted = [...products];
    // Helper to get the correct price for sorting
    const getPrice = (product) => product.salePrice ?? product.originalPrice;
    
    switch (sortOption) {
      case "priceLowHigh":
        sorted.sort((a, b) => getProductPrice(a) - getProductPrice(b));
        break;
      case "priceHighLow":
        sorted.sort((a, b) => getProductPrice(b) - getProductPrice(a));
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

  }, [sortOption, products, loading]);

  // filter the products  
  useEffect(() => {
    if (loading || !sortedProducts.length) {
      setFilteredProducts([]);
      return;
    }

    if (!filter) {
      setFilteredProducts(sortedProducts);
      return;
    }

    let filtered = [...sortedProducts];

    // CATEGORY FILTER
    if (filter.categories) {
      console.log("category filter apply");
      // Get all categories that are checked
      const activeCategories = Object.keys(filter.categories).filter(
        key => filter.categories[key] // only true values
      );

      console.log("only true values of Category: ", activeCategories);
      
      if (activeCategories.length > 0) {
        filtered = filtered.filter(product => {
          // Make sure product.category exists and is a string
          if (!product.category) return false;

          // Convert both to lowercase to avoid case mismatches
          const productCategory = product.category.toLowerCase();

          // Check if the product category matches any active category
          return activeCategories.some(
            category => category.toLowerCase() === productCategory
          );
        });
      }
    }


    // PRICE RANGE FILTER
    if (filter.price) {
      filtered = filtered.filter(product => {
        const price = getProductPrice(product);

        const minOk =
          filter.price.min == null || price >= filter.price.min;

        const maxOk =
          filter.price.max == null || price <= filter.price.max;

        return minOk && maxOk;
      });
    }

    // AVAILABILITY FILTER
    if (filter.availability) {
      const { inStock, outOfStock } = filter.availability;

      if (inStock && !outOfStock) {
        filtered = filtered.filter(p => p.inStock === true);
      } else if (!inStock && outOfStock) {
        filtered = filtered.filter(p => p.inStock === false);
      }
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

    if (searchTerm) {
      filtered = filtered.filter((product) => {
        const searchableFields = [
          product?.name,
          product?.category,
          product?.description,
        ];

        return searchableFields.some(
          (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm)
        );
      });
    }

    setFilteredProducts(filtered);
    console.log("Applied filters:", filter);
    console.log("Filtered products:", filtered);
    setPage(1);
  }, [filter, sortedProducts, loading, searchTerm]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );


  // Empty state component
  const EmptyState = () => (
    <div className="empty-state">
      <h3>No products found</h3>
      <p>Try adjusting your filters or search criteria</p>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="error-state">
      <h3>Something went wrong</h3>
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="retry-button">
        Retry
      </button>
    </div>
  );

  return (
    <>
      <Pageheader 
        title="All Products" 
        des="Discover our premium collection of hair care products" 
        image="/assets/images/products/allProductsheader.jpg"
      />
      
      <FilterBar 
        toggleSidebar={toggleSidebar} 
        layoutSwitch={layoutSwitch} 
        products={filteredProducts} 
        setSortOption={setSortOption} 
        setFilter={setFilter}
        loading={loading}
      />

      <div className="page-content-filterbar-sidebar">
        <div className={`filtersidebar ${isSidebarActive ? 'active' : ''}`}>
          <FilterSidebar toggleSidebar={toggleSidebar} setFilter={setFilter} loading={loading} />
        </div>

        { error ? (
          <ErrorState />
        ):(
          <ProductsSection 
            layout={isLayout}  
            page={page} 
            productsPerPage={PRODUCTS_PER_PAGE} 
            sortedFilteredProducts={filteredProducts}
            loading = {loading}
          />
        )}
      </div>
      
      {/* Show pagination only when not loading, no error, and there are products */}
      {!loading && !error && filteredProducts.length > 0 && totalPages > 1 && (
        <div className="pagination-wrapper">
          <Pagination
            count={totalPages}         
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
          />
        </div>
      )}
    </>
  )
}

export default Products
