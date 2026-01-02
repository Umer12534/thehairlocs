import React, { useState } from 'react'
import Pageheader from '../components/ui/pageheader/Pageheader'
import FilterBar from '../components/ui/filterbar/FilterBar';
import FilterSidebar from '../components/ui/filtersidebar/FilterSidebar';
import ProductsSection from '../components/sections/ProductsSection/ProductsSection';
import Pagination from '@mui/material/Pagination';
import './Global.css'

function Products() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
    
    const toggleSidebar = () => {
        setIsSidebarActive(prev => !prev);
    }
  return (
    <>
    <Pageheader title="All Products" des="Discover our premium collection of hair care products" image="/assets/images/products/allProductsheader.jpg"/>
      <FilterBar toggleSidebar = {toggleSidebar}/>

      <div className="page-content-filterbar-sidebar">
            <div className={`filtersidebar ${isSidebarActive ? 'active' : ''}`}>
                <FilterSidebar  toggleSidebar = {toggleSidebar}/>
            </div>

            <ProductsSection/>
        </div>
        {/* Pagination */}
        <div className="pagination-wrapper">
            <Pagination count={5} variant="outlined" shape="rounded" />
      </div>

    </>
  )
}

export default Products
