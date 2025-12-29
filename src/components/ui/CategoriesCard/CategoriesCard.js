import React from 'react'
import './CategoriesCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'

function CategoryCard({ image, name, total }) {
    return (
        <div className="custom-slide">
            <div className="card-img">
                <img src={image} alt={name} />
            </div>
            <div className="slide-text">
                <p>{name}</p>
                <p>
                    <FontAwesomeIcon icon={faBoxOpen} className='boxicon'></FontAwesomeIcon>
                    {total}
                </p>
            </div>
        </div>
    )
}

export default CategoryCard
