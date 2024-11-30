import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const LogosSlider = () => {
  const images = [
    "images/brand/brand-1-1.png",
    "images/brand/brand-1-2.png",
    "images/brand/brand-1-3.png",
    "images/brand/brand-1-4.png",
    "images/brand/brand-1-5.png",
  ];

  return (
    <section className="brand-one">
      <div className="container">
        <div className="brand-one__carousel">
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              450: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
            }}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            loop
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {images.concat(images).map((img) => (
              <SwiperSlide key={img}>
                <div className="item">
                  <img src={img} alt='logo'/>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default LogosSlider;
