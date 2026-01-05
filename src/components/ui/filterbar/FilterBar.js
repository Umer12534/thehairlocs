import React, { useState } from "react";
import "./FilterBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGrip,
  faGripVertical,
  faGripLines
} from "@fortawesome/free-solid-svg-icons"

function FilterBar({toggleSidebar, layoutSwitch}) {
  const [activeLayout, setActiveLayout] = useState(3);

  const handleLayoutChange = (layout)=>{
    setActiveLayout(layout);
    layoutSwitch(layout);
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
          <span>24</span> products
        </div>

        <div className="sort-options">
          <select id="sort-by">
            <option value="default">Sort by: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="popularity">Popularity</option>
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
