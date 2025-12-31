import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'
import { categories } from '../../../data/Categories'
import CategoryCard from '../../ui/CategoriesCard/CategoriesCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import './AllCategoriesSection.css'

function AllCategoriesSection() {
    const swiperRef = useRef(null)

    return (
        <section className="new-categories">

            {/* Custom Navigation */}
            <div className="custom-nav">
                <button
                    className="cat-prev"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                    className="cat-next"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>

            <div className="categories-container">
                <div className="swiper-slides">
                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        modules={[Navigation, Autoplay]}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        spaceBetween={20}
                        slidesPerView={4}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 10 },
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 4, spaceBetween: 30 }
                        }}
                    >
                        {categories.map(category => (
                            <SwiperSlide key={category.id}>
                                <CategoryCard {...category} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
        </section>
    )
}

export default AllCategoriesSection
