import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4a/Google_2015_logo.svg",
];

export default function TrustedBy() {
  return (
    <div className="py-6 mt-10 mb-10">
      <h2 className="text-white text-center text-xl font-semibold mb-4">
        Loved by
      </h2>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}
        spaceBetween={40}
        loop={true}
        speed={5000} // control overall smoothness (higher = slower scroll)
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        allowTouchMove={false} // disables manual swipe (optional, avoids stutter on mobile)
        className="flex items-center mt-10"
      >
        {logos.map((logo, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center"
          >
            <img
              src={logo}
              alt={`Logo ${index}`}
              className="h-12 object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  );
}
