import React, { useState } from 'react'
import Pageheader from '../components/ui/pageheader/Pageheader'
import FilterBar from '../components/ui/filterbar/FilterBar';
import FilterSidebar from '../components/ui/filtersidebar/FilterSidebar';
import ProductsSection from '../components/sections/ProductsSection/ProductsSection';
import Pagination from '@mui/material/Pagination';
import { products } from '../data/Products';
import './Global.css'

function Products() {
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
    const totalPages = Math.ceil(
      products.length / PRODUCTS_PER_PAGE
    );
  return (
    <>
    <Pageheader title="All Products" des="Discover our premium collection of hair care products" image="/assets/images/products/allProductsheader.jpg"/>
      <FilterBar toggleSidebar = {toggleSidebar} layoutSwitch= {layoutSwitch}/>

      <div className="page-content-filterbar-sidebar">
            <div className={`filtersidebar ${isSidebarActive ? 'active' : ''}`}>
                <FilterSidebar  toggleSidebar = {toggleSidebar}/>
            </div>

            <ProductsSection layout={isLayout}  page={page} productsPerPage={PRODUCTS_PER_PAGE} />
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
