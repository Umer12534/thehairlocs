import React, { useState }  from 'react';
import './FilterSidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";


function RangeSlider({ price, setPrice }) {
  const handleChange = (event, newValue) => {
    setPrice({
      min: newValue[0],
      max: newValue[1],
    });
  };

  return (
    <Box sx={{ width: "100%", px: 1 }}>
      <Slider
        value={[price.min, price.max]}  // directly use price from props
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={10000}
      />
    </Box>
  );
}




function FilterSidebar({toggleSidebar, setFilter}) {

  
  // --- STATE FOR FILTERS ---
  const [categories, setCategories] = useState({
    moisturizers: false,
    hair_oils: false,
    shampoos: false,
    conditioners: false,
    styling: false,
    Hair_Serums: false,
  });

  const [price, setPrice] = useState({ min: 0, max: 5000 });

  const [availability, setAvailability] = useState({
    inStock: true,
    outOfStock: false,
  });

  const [hairType, setHairType] = useState({
    dry: false,
    oily: false,
    damaged: false,
    curly: false,
    straight: false,
  });

  // --- HANDLE CHANGES ---
  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setCategories((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAvailabilityChange = (e) => {
    const { name, checked } = e.target;
    setAvailability((prev) => ({ ...prev, [name]: checked }));
  };

  const handleHairTypeChange = (e) => {
    const { name, checked } = e.target;
    setHairType((prev) => ({ ...prev, [name]: checked }));
  };


  const applyFilters = () => {
    const filters = {
      categories,
      price,
      availability,
      hairType,
    };
    console.log("Applied Filters:", filters);
    setFilter(filters);
  };

  const clearFilters = () => {
    setCategories({
      moisturizers: false,
      oils: false,
      shampoos: false,
      conditioners: false,
      styling: false,
    });
    setPrice({ min: 0, max: 5000 });
    setAvailability({ inStock: true, outOfStock: false });
    setHairType({
      dry: false,
      oily: false,
      damaged: false,
      curly: false,
      straight: false,
    });
    const filters = {
      categories,
      price,
      availability,
      hairType,
    };
    setFilter(filters);
  };

  return (
    <aside className="sidebar">
      <div className="filter-heading">
        <h3>Filters</h3>
          <FontAwesomeIcon icon = {faXmark} onClick={toggleSidebar} className="filterbarclosebtn"/>
      </div>
      <div className="filter-contant">
        {/* Categories */}
        <details className="filter-group" open>
          <summary>
            <span>Category</span>
            <FontAwesomeIcon icon={faAngleDown} className='angleDown'/>
          </summary>
          
          <div className="filter-options">
            {Object.keys(categories).map((key) => (
              <div className="filter-option" key={key}>
                <input
                  type="checkbox"
                  id={`category-${key}`}
                  name={key}
                  checked={categories[key]}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={`category-${key}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              </div>
            ))}
          </div>
          
        </details>

        {/* Price range */}
        <details className="filter-group">
          <summary>
            <span>Price Range</span>
            <FontAwesomeIcon icon={faAngleDown} className='angleDown'/>
          </summary>

          <RangeSlider price={price} setPrice={setPrice} />

          <div className="price-values">
            <label htmlFor="min">
              <span>Rs: </span>
              <input
                type="number"
                name="min"
                id="min-price"
                value={price.min}
                onChange={(e) => setPrice({ ...price, min: Number(e.target.value) })}
              />
            </label>

            <label htmlFor="max">
              <span>Rs:</span>
              <input
                type="number"
                name="max"
                id="max-price"
                value={price.max}
                onChange={(e) => setPrice({ ...price, max: Number(e.target.value) })}
              />
            </label>


          </div>
        </details>
    
        {/* --- Availability --- */}
        <details className='filter-group'>
          <summary>
            <span>Availability</span>  
            <FontAwesomeIcon icon={faAngleDown} className='angleDown'/>
          </summary>

          <div className="filter-options">
            <div className="filter-option">
              <input
                type="checkbox"
                id="in-stock"
                name="inStock"
                checked={availability.inStock}
                onChange={handleAvailabilityChange}
              />
              <label htmlFor="in-stock">In Stock</label>
            </div>
            <div className="filter-option">
              <input
                type="checkbox"
                id="out-stock"
                name="outOfStock"
                checked={availability.outOfStock}
                onChange={handleAvailabilityChange}
              />
              <label htmlFor="out-stock">Out of Stock</label>
            </div>
          </div>
        </details>

        {/* --- Hair Type --- */}
        <details  className="filter-group">
          <summary>
            <span>Hair Type</span>
            <FontAwesomeIcon icon={faAngleDown} className='angleDown'/>
          </summary>
      
          <div className="filter-options">
            {Object.keys(hairType).map((key) => (
              <div className="filter-option" key={key}>
                <input
                  type="checkbox"
                  id={`type-${key}`}
                  name={key}
                  checked={hairType[key]}
                  onChange={handleHairTypeChange}
                />
                <label htmlFor={`type-${key}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)} Hair
                </label>
              </div>
            ))}
          </div>
        </details>
      </div>

      
      <div className="filter-btn">
        <button className="applyFilterBtn" onClick={applyFilters}>
          Apply Filters
        </button>
        <button className="clearFilterBtn" onClick={clearFilters}>
          Clear All Filters
        </button>
      </div>
    </aside>
  );
}

export default FilterSidebar;
