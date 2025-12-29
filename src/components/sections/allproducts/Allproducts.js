import FilterSidebar from '../../ui/filtersidebar/FilterSidebar'
import { useState } from 'react'
import './Allproducts.css'
import {products} from '../../../data/Products'
import ProductCard from '../../ui/ProductCard/ProductCard'
import Pagination from '@mui/material/Pagination';
import FilterBar from '../../ui/filterbar/FilterBar'

function Allproducts(){
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    
    const toggleSidebar = () => {
        setIsSidebarActive(prev => !prev);
    }

    return(
        <>
        <FilterBar toggleSidebar = {toggleSidebar}/>

        <div className="product-page">
            <div className={`filtersidebar ${isSidebarActive ? 'active' : ''}`}>
                <FilterSidebar  toggleSidebar = {toggleSidebar}/>
            </div>
            <div className="allproductsection">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        {...product}
                    />
                ))}
            </div>
        </div>
        {/* Pagination */}
        <div className="pagination-wrapper">
            <Pagination count={5} variant="outlined" shape="rounded" />
        </div>
        </>    
    )
}


export default Allproducts
