import { useState } from "react";
import './FilterSidebar.css'
import { FontAwesomeLayers } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function FilterSidebar() {
  // --- STATE FOR FILTERS ---
  const [categories, setCategories] = useState({
    moisturizers: false,
    oils: false,
    shampoos: false,
    conditioners: false,
    styling: false,
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

  // --- TOGGLE SIDEBAR ---
  const toggleFilter = () => {
    console.log("Toggle Filter Sidebar");
  };

  // --- HANDLE CHANGES ---
  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setCategories((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPrice((prev) => ({ ...prev, [name]: Number(value) }));
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
    // You can pass this object to API or filter product list
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
  };

  return (
    <aside className="sidebar">
      <h3>
        Filters <FontAwesomeLayers icon = {faXmark} onClick={toggleFilter} className="filterbarclosebtn"/>
      </h3>

      {/* --- Category --- */}
      <div className="filter-group">
        <h4>Category</h4>
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
      </div>

      {/* --- Price Range --- */}
      <div className="filter-group">
        <h4>Price Range</h4>
        <div className="price-inputs">
          <input
            type="number"
            id="min-price"
            name="min"
            placeholder="Min"
            value={price.min}
            onChange={handlePriceChange}
          />
          <div> to </div>
          <input
            type="number"
            id="max-price"
            name="max"
            placeholder="Max"
            value={price.max}
            onChange={handlePriceChange}
          />
        </div>
      </div>

      {/* --- Availability --- */}
      <div className="filter-group">
        <h4>Availability</h4>
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
      </div>

      {/* --- Hair Type --- */}
      <div className="filter-group">
        <h3>Hair Type</h3>
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
