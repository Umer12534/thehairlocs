import { useEffect, useState } from 'react';
import Pageheader from '../components/ui/pageheader/Pageheader'
import ProductsSection from '../components/sections/ProductsSection/ProductsSection';
import FilterBar from '../components/ui/filterbar/FilterBar';
import FilterSidebar from '../components/ui/filtersidebar/FilterSidebar';
import Pagination from '@mui/material/Pagination';
import { products } from '../data/Products';
import Stack from '@mui/material/Stack';
import './Global.css'

function Sale(){
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8; 
  const [isLayout, setLayout] = useState(3);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  
  const saleProductsCount = products.filter(
    product => product.badgeType === "sale"
  ).length;

  const totalPages = Math.ceil(
    saleProductsCount / PRODUCTS_PER_PAGE
  );

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
  
  return(
  <>
    <Pageheader title="Sale" des= "Up to 50% off on premium hair locs products" image= "/assets/images/sale/saleheader.jpg"/>
    <FilterBar toggleSidebar = {toggleSidebar} layoutSwitch= {layoutSwitch} setSortOption={setSortOption} products={products.filter(
    product => product.badgeType === "sale"
  )}/>
    
    <div className="page-content-filterbar-sidebar">
            <div className={`filtersidebar ${isSidebarActive ? 'active' : ''}`}>
                <FilterSidebar  toggleSidebar = {toggleSidebar} />
            </div>

            <ProductsSection badgeType="sale" layout={isLayout} page={page} productsPerPage={PRODUCTS_PER_PAGE} sortedProducts= {sortedProducts}/>
        </div>
        {/* Pagination */}
        <div className="pagination-wrapper">
          <Pagination
            count={totalPages}          // temporary (will fix dynamically)
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
          />
    </div>
  </>
  );
}

export default Sale
