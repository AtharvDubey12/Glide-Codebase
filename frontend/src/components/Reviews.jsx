import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

function Reviews() {
  const reviews = [
    "Glide makes file sharing effortless — I love it!",
    "The sleek UI of Glide makes it a joy to use every day.",
    "Finally, a storage platform that's both fast and secure. Glide nails it.",
    "Glide's sharing links are clean and easy — no more ugly URLs!",
    "The Amazing privacy access controls on Glide gives me peace of mind for my work files.",
    "Minimal design, powerful features — Glide is my go-to file platform.",
    "With Glide, my uploads finish before my coffee is ready.",
    "Seamless syncing across devices — Glide keeps me productive anywhere.",
  ];

  const slidesWithGaps = reviews.flatMap((review) => [
    review,
    ""
  ]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        slidesPerView={1}
        speed={1200} 
        autoplay={{
          delay: 1200,
          disableOnInteraction: false,
        }}
      >
        {slidesWithGaps.map((review, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center"
          >
            {review && (
              <p className="text-white text-sm font-light text-center px-3 leading-snug">
                “{review}”
              </p>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Reviews;
