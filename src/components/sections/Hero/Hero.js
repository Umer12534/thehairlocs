import React from 'react'
import HeroSection from '../HeroSection/HeroSection'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'
import './Hero.css'


const heroSlides = [
    {
        id: 1,
        title: 'Mastering the Art of Locs and Natural Hair Care',
        text: `Whether you're just beginning your loc journey or seeking advanced techniques, our expert guides and premium products will support your natural beauty.`,
        btnText: 'EXPLORE ALL PRODUCTS',
        btnLink: '/Categories',
        image: "/assets/images/hero/hero1.jpg",
        alt: 'Natural hair care products'
    },
        {
        id: 2,
        title: 'Premium Natural Hair Products',
        text: `Discover our curated collection of organic and natural hair care
            solutions designed specifically for locs and textured hair.`,
        btnText: 'SHOP NOW',
        btnLink: '/Categories',
        image: "/assets/images/hero/hero2.jpg",
        alt: 'Natural hair products'
    },
        {
        id: 3,
        title: 'Expert Guides & Tutorials',
        text: `Learn from professional stylists with our step-by-step tutorials and comprehensive hair care guides.`,
        btnText: 'LEARN MORE',
        btnLink: '/Categories',
        image: "/assets/images/hero/hero3.jpg",
        alt: 'Hair care tutorial'
    },
    {
        id: 4,
        title: 'Community & Support',
        text: `Join our growing community of natural hair enthusiasts sharing tips, experiences, and inspiration.`,
        btnText: 'JOIN COMMUNITY',
        btnLink: '/Categories',
        image: "/assets/images/hero/hero4.jpg",
        alt: 'Hair care community'
        }
]

const Hero = () => {
    return (
            <section className="heroSwiper">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 6000, disableOnInteraction: false}}
                speed={1400}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
            >
                {heroSlides.map(slide=>(
                <SwiperSlide key={slide.id}>
                    <HeroSection {...slide}/>
                </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default Hero
