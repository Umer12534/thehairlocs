import { useState } from 'react';
import Pageheader from '../components/ui/pageheader/Pageheader'
import ProductsSection from '../components/sections/ProductsSection/ProductsSection';
import FilterBar from '../components/ui/filterbar/FilterBar';

function Sale(){

  const [isSidebarActive, setIsSidebarActive] = useState(false);
  
  const toggleSidebar = () => {
      setIsSidebarActive(prev => !prev);
  }
  
  return(
  <>
    <Pageheader title="Sale" des= "Up to 50% off on premium hair locs products" image= "/assets/images/sale/saleheader.jpg"/>
    <FilterBar toggleSidebar = {toggleSidebar}/>
    
    <ProductsSection badgeType="sale"/>
  </>
  );
}

export default Sale
