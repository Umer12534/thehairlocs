import React, { useState } from "react";
import "./FilterBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGrip,
  faGripVertical,
  faGripLines
} from "@fortawesome/free-solid-svg-icons"

function FilterBar({toggleSidebar, layoutSwitch, products =[], setSortOption}) {
  const [activeLayout, setActiveLayout] = useState(3);

  const handleLayoutChange = (layout)=>{
    setActiveLayout(layout);
    layoutSwitch(layout);
  }
  const handleSortOption = (sort)=>{
    setSortOption(sort)
  }
  return (
    <>
      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="layout-switch">
            <FontAwesomeIcon icon={faGrip} 
            className={`layout-icon ${activeLayout === 3 ? "layout-active" : ""}`} 
            onClick={() => {handleLayoutChange(3)}}/>
            
            <FontAwesomeIcon icon={faGripVertical} 
              className={`layout-icon ${activeLayout === 2 ? "layout-active" : ""}`}
              onClick={() => handleLayoutChange(2)}/>
            
            <FontAwesomeIcon icon={faGripLines} 
              className={`layout-icon ${activeLayout === 4 ? "layout-active" : ""}`}
              onClick={() => handleLayoutChange(4)}/>

            <FontAwesomeIcon icon={faGripLines} 
              className={`layout-icon ${activeLayout === 1 ? "layout-active" : ""}`}
              onClick={() => handleLayoutChange(1)}/>
            
        </div>

        <div className="product-count">
          <span>{products.length || 0}</span> products
        </div>

        <div className="sort-options-div">
          <select id="sort-by" className="sort-options" onChange={(e)=>handleSortOption(e.target.value)}>
            <option 
            value="default">Sort by: Default</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="nameAZ">Name: A to Z</option>
            <option value="nameZA">Name: Z to A</option>
          </select>
        </div>

        <div className="fliter-btn" onClick={toggleSidebar}>
          Fliter
        </div>
      </div>
    </>
  );
}

export default FilterBar;
