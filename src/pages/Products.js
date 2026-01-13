import React, { useEffect, useState } from 'react'
import Pageheader from '../components/ui/pageheader/Pageheader'
import FilterBar from '../components/ui/filterbar/FilterBar';
import FilterSidebar from '../components/ui/filtersidebar/FilterSidebar';
import ProductsSection from '../components/sections/ProductsSection/ProductsSection';
import Pagination from '@mui/material/Pagination';
import { products } from '../data/Products';
import './Global.css'

function Products() {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState("");
  const [filter, setFilter] = useState({
    categories: {
      moisturizers: false,
      hair_oils: false,
      shampoos: false,
      conditioners: false,
      styling: false,
      Hair_Serums: false,
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

  const getProductPrice = (product) => product.salePrice ?? product.originalPrice;
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8;
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isLayout, setLayout] = useState(3);
    
    const toggleSidebar = () => {
        setIsSidebarActive(prev => !prev);
    }

    const layoutSwitch=(layoutgrid)=>{
      setLayout(layoutgrid)
    }
    


    useEffect(() => {
      // Copy products array
      let sorted = [...products];
      // Helper to get the correct price for sorting
      const getPrice = (product) => product.salePrice ?? product.originalPrice;
      
      switch (sortOption) {
        case "priceLowHigh":
          sorted.sort((a, b) => getPrice(a) - getPrice(b));
          break;
        case "priceHighLow":
          sorted.sort((a, b) => getPrice(b) - getPrice(a));
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
    }, [sortOption]);

    // filter the products  
    useEffect(() => {
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

          const minOk = filter.price.min == null || price >= filter.price.min;
          const maxOk = filter.price.max == null || price <= filter.price.max;

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

      setFilteredProducts(filtered);
      console.log("Applied filters:", filter);
      console.log("Filtered products:", filtered);
      setPage(1);
    }, [filter]);

    const totalPages = Math.ceil(
      filteredProducts.length / PRODUCTS_PER_PAGE
    );

  return (
    <>
    <Pageheader title="All Products" des="Discover our premium collection of hair care products" image="/assets/images/products/allProductsheader.jpg"/>
      <FilterBar toggleSidebar = {toggleSidebar} layoutSwitch= {layoutSwitch} products= {filteredProducts} setSortOption={setSortOption}/>

      <div className="page-content-filterbar-sidebar">
            <div className={`filtersidebar ${isSidebarActive ? 'active' : ''}`}>
                <FilterSidebar  toggleSidebar = {toggleSidebar} setFilter={setFilter}/>
            </div>

            <ProductsSection layout={isLayout}  page={page} productsPerPage={PRODUCTS_PER_PAGE} sortedFilteredProducts= {filteredProducts}/>
        </div>
        {/* Pagination */}
        <div className="pagination-wrapper">
          <Pagination
            count={totalPages}         
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
          />
        </div>

    </>
  )
}

export default Products
