import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'
import './Hero.css'
import { Link } from 'react-router-dom'

const heroSlides = [
    {
        id: 1,
        title: 'Mastering the Art of Locs and Natural Hair Care',
        text: `Whether you're just beginning your loc journey or seeking advanced techniques, our expert guides and premium products will support your natural beauty.`,
        btnText: 'EXPLORE ALL PRODUCTS',
        btnLink: '/category',
        image: "/assets/images/hero/hero1.jpg",
        alt: 'Natural hair care products'
    },
        {
        id: 2,
        title: 'Premium Natural Hair Products',
        text: `Discover our curated collection of organic and natural hair care
            solutions designed specifically for locs and textured hair.`,
        btnText: 'SHOP NOW',
        btnLink: '/category',
        image: "/assets/images/hero/hero2.jpg",
        alt: 'Natural hair products'
    },
        {
        id: 3,
        title: 'Expert Guides & Tutorials',
        text: `Learn from professional stylists with our step-by-step tutorials and comprehensive hair care guides.`,
        btnText: 'LEARN MORE',
        btnLink: '/category',
        image: "/assets/images/hero/hero3.jpg",
        alt: 'Hair care tutorial'
    },
    {
        id: 4,
        title: 'Community & Support',
        text: `Join our growing community of natural hair enthusiasts sharing tips, experiences, and inspiration.`,
        btnText: 'JOIN COMMUNITY',
        btnLink: '/category',
        image: "/assets/images/hero/hero4.jpg",
        alt: 'Hair care community'
        }
]

function Hero() {
    return (
        <section className="hero-section">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false}}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
            >

            {heroSlides.map(slide => (
                <SwiperSlide key={slide.id}>
                    <div className="hero-slide">
                        <div className="hero-text">
                            <h2>{slide.title}</h2>
                            <p>{slide.text}</p>
                            <Link to={slide.btnLink} className="hero-btn">{slide.btnText}</Link>
                        </div>
                        <div className="hero-img">
                            <img src={slide.image} alt={slide.alt} />
                        </div>
                    </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </section>
    )
}

export default Hero
