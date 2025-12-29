import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'
import './Banner.css'

const Bannerimg =[
    {
        id: 1,
        image: "/assets/images/banners/Banner1.png"
    },
    {
        id: 2,
        image: "/assets/images/banners/Banner2.png"
    }
]
function Banner(){
    return (

        <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 6000, disableOnInteraction: false}}
            speed={1400}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
        >
            {Bannerimg.map(bannerimg => (
                <SwiperSlide key={bannerimg.id} className='bannerswiperslide'>
                    <div className="banner-image">
                        <img src={bannerimg.image} alt="Banner" />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
)
}

export default Banner
