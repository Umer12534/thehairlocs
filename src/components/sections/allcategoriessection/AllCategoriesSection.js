import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import CategoryCard from '../../ui/CategoriesCard/CategoriesCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { db } from "../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import CategoryCardSkeleton from '../../ui/categoryCardSkeleton/CategoryCardSkeleton'
import './AllCategoriesSection.css'

function AllCategoriesSection() {
    const swiperRef = useRef(null)
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    if (loading) return;

    const swiper = swiperRef.current;
    if (!swiper || !swiper.autoplay) return;

    // Swiper may mount with autoplay disabled while loading;
    // explicitly start autoplay once real data is ready.
    if (!swiper.autoplay.running) {
        swiper.autoplay.start();
    }
    }, [loading, categories.length]);

    useEffect(() => {
    const fetchCategories = async () => {
        try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "Category"));

        const fetched = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        const activeCategories = fetched.filter(
            cat => cat.status !== "inactive"
        );

        setCategories(activeCategories);
        } catch (err) {
        console.error("Error fetching categories:", err);
        } finally {
        setLoading(false);
        }
    };

    fetchCategories();
    }, []);

    if (!loading && categories.length === 0) return null;

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
                        navigation={{
                        prevEl: '.cat-prev',
                        nextEl: '.cat-next'
                        }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={categories.length > 4}
                        spaceBetween={20}
                        slidesPerView={4}
                        breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 30 }
                        }}
                    >
                        {loading
                        ? Array.from({ length: 4 }).map((_, idx) => (
                            <SwiperSlide key={idx}>
                                <CategoryCardSkeleton />
                            </SwiperSlide>
                            ))
                        : categories.map(category => (
                            <SwiperSlide key={category.id}>
                                <CategoryCard {...category} />
                            </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    </div>

            </div>
        </section>
    )
}

export default AllCategoriesSection
