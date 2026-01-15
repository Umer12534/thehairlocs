import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faSpinner, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";

function SearchBar(isOpen, onClose){

    return(
        <>
            <div className={`searchbar-container `}>
            <form action="">
                <div className="search-bar-wraper">
                    <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                    <input type="text" />
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                </div>
            </form>
        </div>
        
        </>
    )
}


export default SearchBar;