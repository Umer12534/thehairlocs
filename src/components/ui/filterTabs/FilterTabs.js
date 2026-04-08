import React, {useState} from 'react'
import './FilterTabs.css'

function FilterTabs({categories}){

    const [activeCategory, setActiveCategory] = useState("All Categories");

    const handleScroll = (category) => {
        setActiveCategory(category.name);

        const section = document.getElementById(category.sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return(
        <>
        <section className="categories-filter">
            <div className="filter-container">

                {/* Search Box */}
                <div className="filter-search">
                    <div className="search-box">
                        <input type="text" placeholder="Search categories..." />
                        <i className="fas fa-search"></i>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="filter-tags">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            className={`filter-tag ${
                            activeCategory === category.name ? "filter-active" : ""
                            }`}
                            onClick={() => handleScroll(category)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

            </div>
    </section>
        </>
    )
}

export default FilterTabs
