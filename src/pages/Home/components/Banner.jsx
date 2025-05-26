import React, { useEffect, useState } from "react";
import sliderImg1 from "../../../assets/images/slider/slider-1-1.jpg";
import sliderImg2 from "../../../assets/images/slider/slider-1-2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Banner = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (!swiperInstance) return;

    // Fade in the text for the first slide on initial load
    gsap.fromTo(
      ".swiper-slide-active .text-content",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    swiperInstance.on("slideChangeTransitionStart", () => {
      // Fade out all text during the transition
      gsap.to(".swiper-slide .text-content", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    swiperInstance.on("slideChangeTransitionEnd", () => {
      // Fade in the text of the active slide
      gsap.fromTo(
        ".swiper-slide-active .text-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    });

    // Cleanup event listeners on unmount
    return () => {
      swiperInstance.off("slideChangeTransitionStart");
      swiperInstance.off("slideChangeTransitionEnd");
    };
  }, [swiperInstance]);

  const scrollToOrderNow = () => {
    const orderNowDiv = document.getElementById("order-now");
    if (orderNowDiv) {
      const yOffset = -100; // Adjust this value for the offset (e.g., height of the fixed header)
      const yPosition =
        orderNowDiv.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };
  return (
    <section className="banner-section">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        modules={[Autoplay, Pagination, Navigation]}
        onSwiper={setSwiperInstance}
        className="mySwiper"
      >
        {[sliderImg1, sliderImg2].map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide px-4"
              style={{
                backgroundImage: `url(${img})`,
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="text-content"
                style={{ textAlign: "center", opacity: 0 }}
              >
                <span className="tag-line">Welcome to Mudralanka</span>
                <h3 className="banner-title">
                  TRUSTED PRINTING HUB SINCE 1982
                </h3>
                <p>
                  Design helps us to stand out, It tells a story <br /> about us
                  and what we stand for.
                </p>
                <div className="btn-block">
                  <Link onClick={scrollToOrderNow} className="banner-btn">
                    Order Online Now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
