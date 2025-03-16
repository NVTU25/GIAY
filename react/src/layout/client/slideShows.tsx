import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
    "https://myshoes.vn/image/cache/catalog/2025/banner/myshoes-100000-khach-hang-slide-2480x2000h.png",
    "https://myshoes.vn/image/cache/catalog/2024/banner/myshoes-sale-slide-t7-2480x2000h.png",
    "https://myshoes.vn/image/cache/catalog/2025/banner/khach-hang-kim-cuong-2480x2000h.png"
]
const SlideShows: React.FC = () => {
  return (
    <div className='flex justify-between w-full mt-[20px]'>
        <img className='w-1/5 h-[500px] ml-[20px]' src="./anh4.png" alt="" />
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={true}
            navigation
            pagination={{ clickable: true }}
            autoplay = {{ delay: 3000 }}
            loop
            className='w-[55%] h-[600px]'
        >
            {images.map((src, index) => (
                <SwiperSlide key={index}>
                    <img src={src} alt="" className='w-full h-full object-cover'/>
                </SwiperSlide>
            ))}
        </Swiper>
        <img className='w-1/5 h-[500px] mr-[20px]' src="./anh5.jpg" alt="" />
    </div>
  )
}

export default SlideShows;