import FilterSidebar from '../../ui/filtersidebar/FilterSidebar'
import './Allproducts.css'
import {products} from '../../../data/Products'
import ProductCard from '../../ui/ProductCard/ProductCard'
function Allproducts(){

    return(
        <>
        <div className="product-page">
            <div className="filtersidebar">
                <FilterSidebar/>
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
        </>    
    )
}


export default Allproducts
