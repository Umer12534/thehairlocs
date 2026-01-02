import { useState } from 'react';
import Pageheader from '../components/ui/pageheader/Pageheader'
import ProductsSection from '../components/sections/ProductsSection/ProductsSection';
import FilterBar from '../components/ui/filterbar/FilterBar';
import FilterSidebar from '../components/ui/filtersidebar/FilterSidebar';
import Pagination from '@mui/material/Pagination';
import './Global.css'

function Sale(){

  const [isSidebarActive, setIsSidebarActive] = useState(false);
  
  const toggleSidebar = () => {
      setIsSidebarActive(prev => !prev);
  }
  
  return(
  <>
    <Pageheader title="Sale" des= "Up to 50% off on premium hair locs products" image= "/assets/images/sale/saleheader.jpg"/>
    <FilterBar toggleSidebar = {toggleSidebar}/>
    
    <div className="page-content-filterbar-sidebar">
            <div className={`filtersidebar ${isSidebarActive ? 'active' : ''}`}>
                <FilterSidebar  toggleSidebar = {toggleSidebar}/>
            </div>

            <ProductsSection badgeType="sale"/>
        </div>
        {/* Pagination */}
        <div className="pagination-wrapper">
            <Pagination count={5} variant="outlined" shape="rounded" />
    </div>
  </>
  );
}

export default Sale
