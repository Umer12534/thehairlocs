import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";

function SearchBar({
  onSearch,
  onClose,
  autoFocus = false,
  initialValue = "",
  placeholder = "Search products by name or category...",
}) {
  const [query, setQuery] = useState(initialValue);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.(query);
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSubmit}>
        <div className="search-bar-wraper">
          <button type="submit" className="search-icon-btn" aria-label="Search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            aria-label="Search products"
          />
          {query && (
            <button type="button" className="search-clear-btn" onClick={handleClear} aria-label="Clear search">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
