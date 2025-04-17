import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Testimonials = () => {
  const testimonials = [
    {
      image: "images/testimonials/testimonials-1-1.jpg",
      name: "Christine Eve",
      text: "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch.",
    },
    {
      image: "images/testimonials/testimonials-1-2.jpg",
      name: "Marilynn Charette",
      text: "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch.",
    },
    {
      image: "images/testimonials/testimonials-1-3.jpg",
      name: "Mikaela Cunniffe",
      text: "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch.",
    },
  ];
  return (
    <section className="testimonial-one">
      <div className="container">
        <div className="testimonial-one__carousel">
          <Swiper
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.name}>
                <div className="item">
                  <div className="testimonial-one__single">
                    <div
                      className="testimonial-one__imagename"
                      // style={{ background: "red" }}
                    >
                      {testimonial.name.split(" ")[0]?.charAt(0) || ""}{" "}
                      {testimonial.name.split(" ")[1]?.charAt(0) || ""}
                      {/* <img src={testimonial.image} alt={testimonial.name} /> */}
                    </div>
                    <p className="testimonial-one__text">{testimonial.text}</p>
                    <h4 className="testimonial-one__name">
                      {testimonial.name}
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
