import React from "react";
import "./FilterBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGrip,
  faGripVertical,
  faGripLines
} from "@fortawesome/free-solid-svg-icons"

function FilterBar() {

  const toggleFilter = () => {
    console.log("Filter button clicked");
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="layout-switch">
            <FontAwesomeIcon icon={faGrip} className="layout-icon"/>
            <FontAwesomeIcon icon={faGripVertical} className="layout-icon"/>
            <FontAwesomeIcon icon={faGripLines} className="layout-icon"/>
        </div>

        <div className="product-count">
          Showing <span>24</span> products
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

        <div className="fliter-btn" onClick={toggleFilter}>
          Fliter
        </div>
      </div>
    </>
  );
}

export default FilterBar;
