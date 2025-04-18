'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

const images = Array.from({ length: 22 }, (_, i) => `/image${i + 1}.jpg`);

export default function Slider() {
  return (
    <div className="w-full h-full flex justify-center items-center px-2">
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={window.innerWidth < 768 ? 1.5 : 3} // More visible slides on desktop
        loop={true}
        spaceBetween={-50}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          scale: 0.8,
          slideShadows: false,
        }}
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide
            key={index}
            className="w-[220px] md:w-[280px] transition-all duration-500"
          >
            <img
              src={src}
              alt={`slide-${index}`}
              className="rounded-xl object-cover h-[400px] md:h-[500px] w-full shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
