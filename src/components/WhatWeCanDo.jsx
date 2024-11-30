import React from "react";
import { PiCaretRightBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const WhatWeCanDo = () => {
  return (
    <section className="service-one sec-pad-top">
      <div className="container">
        <div className="block-title text-center">
          <p className="block-title__tag-line ">Our Features</p>
          <h2 className="block-title__title">What We Can Do</h2>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="service-one__single">
              <div className="service-one__image">
                <img src="/images/service/service-1-1.jpg" alt="Sticker Printing" />
              </div>
              <div className="service-one__text-block">
                <h3 className="service-one__title">
                  <Link to="/sticker-printing">Sticker Printing</Link>
                </h3>

                <p className="service-one__text">
                  Create eye-catching, custom stickers with vibrant colors and
                  durable materials. Perfect for branding, events, and personal
                  use!
                </p>

                <Link to="/sticker-printing" className="service-one__link">
                  <PiCaretRightBold className="text-white" size={19} />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="service-one__single">
              <div className="service-one__image">
                <img src="/images/service/service-1-2.jpg" alt="Visiting Card" />
              </div>
              <div className="service-one__text-block">
                <h3 className="service-one__title">
                  <Link to="/visitingcard">Visiting Card</Link>
                </h3>

                <p className="service-one__text">
                  Design unique and premium visiting cards to showcase your
                  identity and leave a lasting impression on everyone.
                </p>

                <Link to="/visitingcard" className="service-one__link">
                  <PiCaretRightBold className="text-white" size={19} />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="service-one__single">
              <div className="service-one__image">
                <img src="/images/service/service-1-3.jpg" alt="PVC ID Card" />
              </div>
              <div className="service-one__text-block">
                <h3 className="service-one__title">
                  <Link to="/pvcidcard">PVC ID Card</Link>
                </h3>

                <p className="service-one__text">
                  Durable, professional PVC ID cards printed with high-quality
                  designs. Ideal for businesses, schools, and events. Secure and
                  customizable!
                </p>

                <Link to="/pvcidcard" className="service-one__link">
                  <PiCaretRightBold className="text-white" size={19} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeCanDo;
