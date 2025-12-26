import React from 'react'

function FilterSidebar() {
  return (
    <>
        <aside className="sidebar" id="filter-sidebar">
            <h3>Filters <i classNam="fa-solid fa-xmark" onclick={togglefilter}></i></h3>
            
            <div classNam="filter-group">
                <h4>
                    Category
                </h4>
                <div classNam="filter-options">
                    <div classNam="filter-option">
                        <input type="checkbox" id="category-moisturizers" name="category" value="moisturizers" />
                        <label htmlFor="category-moisturizers">Moisturizers</label>
                    </div>
                    <div classNam="filter-option">
                        <input type="checkbox" id="category-oils" name="category" value="oils" />
                        <label htmlFor="category-oils">Oils & Serums</label>
                    </div>
                    <div classNam="filter-option">
                        <input type="checkbox" id="category-shampoos" name="category" value="shampoos" />
                        <label htmlFor="category-shampoos">Shampoos</label>
                    </div>
                    <div classNam="filter-option">
                        <input type="checkbox" id="category-conditioners" name="category" value="conditioners" />
                        <label htmlFor="category-conditioners">Conditioners</label>
                    </div>
                    <div classNam="filter-option">
                        <label htmlFor="category-styling">Styling Products</label>
                    </div>
                </div>
            </div>

            <div classNam="filter-group">
                <h4>Price Range</h4>
                <div classNam="price-inputs">
                    <input type="number" id="min-price" placeholder="Min" value="0" />
                    <div> to </div>

                    <input type="number" id="max-price" placeholder="Max" value="5000" />
                </div>

            </div>
            
            <div classNam="filter-group">
                <h4>Availability</h4>
                <div classNam="filter-options">
                    <div classNam="filter-option">
                        <input type="checkbox" id="in-stock" checked />
                        <label htmlFor="in-stock">In Stock</label>
                    </div>
                    <div classNam="filter-option">
                        <input type="checkbox" id="out-stock" />
                        <label htmlFor="out-stock">Out of Stock</label>
                    </div>
                    
                </div>
            </div>

            {/* <!-- Hair Type Filter --> */}
            <div classNam="filter-group">
                <h3>
                    Hair Type
                </h3>
                <div classNam="filter-options">
                    <div classNam="filter-option">
                        <input type="checkbox" id="type-dry" name="hair-type" value="dry" />
                        <label htmlFor="type-dry">Dry Hair</label>
                    </div>
                    <div classNam="filter-option">
                        <input type="checkbox" id="type-oily" name="hair-type" value="oily" />
                        <label htmlFor="type-oily">Oily Hair</label>
                    </div>
                    <div classNam="filter-option">
                        <input type="checkbox" id="type-damaged" name="hair-type" value="damaged" />
                        <label htmlFor="type-damaged">Damaged Hair</label>
                    </div>
                    <div classNam="filter-option">
                        <input type="checkbox" id="type-curly" name="hair-type" value="curly" />
                        <label htmlFor="type-curly">Curly Hair</label>
                    </div>
                    <div classNam="filter-option">
                        <input type="checkbox" id="type-straight" name="hair-type" value="straight" />
                        <label htmlFor="type-straight">Straight Hair</label>
                    </div>
                </div>
            </div>
            <div classNam="filter-btn">
                <a href="#" classNam="applyFilterBtn">Apply Filters</a>
                <a href="#" classNam="clearFilterBtn">Clear All Filters</a>
            </div>
        </aside>
    </>
  )
}

export default FilterSidebar
