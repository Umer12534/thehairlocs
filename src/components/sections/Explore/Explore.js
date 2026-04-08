import React from 'react'
import HeroSection from '../HeroSection/HeroSection'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'
import './Explore.css'

const exploreSlides = [
  {
    id: 1,
    title: 'Get 15% Off Your First Visit Expert Locs & Natural Hair Care Tailored Just for You!',
    text: '“Naturally You. Beautifully Locd.”',
    btnText: 'EXPLORE ALL PRODUCTS',
    btnLink: '/products',
    image: '/assets/images/explore/products1.png',
    alt: 'Product 1',
    reverse: true
  },
  {
    id: 2,
    title: 'Get 15% Off Your First Visit Expert Locs & Natural Hair Care Tailored Just for You!',
    text: '“Naturally You. Beautifully Loc’d.”',
    btnText: 'EXPLORE ALL PRODUCTS',
    btnLink: '/products',
    image: '/assets/images/explore/products1.png',
    alt: 'Product 2',
    reverse: true
  },
  {
    id: 3,
    title: 'Get 15% Off Your First Visit Expert Locs & Natural Hair Care Tailored Just for You!',
    text: '“Naturally You. Beautifully Loc’d.”',
    btnText: 'EXPLORE ALL PRODUCTS',
    btnLink: '/products',
    image: '/assets/images/explore/products1.png',
    alt: 'Product 3',
    reverse: true
  },
  {
    id: 4,
    title: 'Get 15% Off Your First Visit Expert Locs & Natural Hair Care Tailored Just for You!',
    text: '“Naturally You. Beautifully Loc’d.”',
    btnText: 'EXPLORE ALL PRODUCTS',
    btnLink: '/products',
    image: '/assets/images/explore/products1.png',
    alt: 'Product 4',
    reverse: true
  }
];

function Explore(){
  return (
          <section className="explore-heroSwiper">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 6000, disableOnInteraction: false}}
                speed={1400}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
            >
              {exploreSlides.map(slide=>(
                <SwiperSlide key={slide.id}>
                    <HeroSection {...slide}/>
                </SwiperSlide>
              ))}
            </Swiper>
        </section>
  )
}

export default Explore
