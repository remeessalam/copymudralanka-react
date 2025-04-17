import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LogosSlider from "../components/LogosSlider";
import Testimonials from "../components/Testimonials";
import MeetTheTeam from "../components/MeetTheTeam";
import FAQs from "../components/FAQs";

const AboutUs = () => {
  return (
    <div class="page-wrapper">
      <Header />
      <div class="inner-banner thm-black-bg text-center">
        <div class="container">
          <h2 class="inner-banner__title">About Us</h2>
          <ul class="thm-breadcrumb">
            <li class="thm-breadcrumb__item">
              <a href="#">Home</a>
            </li>
            <li class="thm-breadcrumb__item">
              <span>About Us</span>
            </li>
          </ul>
        </div>
      </div>
      <section class="sec-pad-top about-two">
        <div class="container">
          <div class="row">
            <div class="col-xl-3 col-lg-6 col-sm-6 content-margin-30">
              <img
                src="/images/resources/about-2-1.jpg"
                alt="Pic"
                className="aboutsectionsplitedimage"
                // style={{ maxHeight: "28rem", width: "100%" }}
              />
            </div>
            <div class="col-xl-3 col-lg-6 col-sm-6 content-margin-30">
              <img
                src="/images/resources/about-2-2.jpg"
                alt="Pic"
                className="aboutsectionsplitedimage"

                // style={{ maxHeight: "28rem", width: "100%" }}
              />
            </div>
            <div class="col-lg-6 content-margin-30">
              <img src="/images/resources/about-2-3.jpg" alt="Pic" />
            </div>
          </div>
          <div class="block-title ">
            <h2 class="block-title__title">
              You’ll Get a Perfect <br /> Design For your <br /> Business
            </h2>
            <h2 class="block-title__text">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.
            </h2>
          </div>
        </div>
      </section>
      <Testimonials />
      <MeetTheTeam />
      <section class="fun-fact-one thm-black-bg sec-pad-content-margin-50 sec-pad">
        <div class="container text-center">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="fun-fact-one__single content-margin-50">
                <h3 class="fun-fact-one__title counter">150</h3>
                <p class="fun-fact-one__text">Projects Completed</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="fun-fact-one__single content-margin-50">
                <h3 class="fun-fact-one__title counter">420</h3>
                <p class="fun-fact-one__text">Items Printed</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="fun-fact-one__single content-margin-50">
                <h3 class="fun-fact-one__title counter">95</h3>
                <p class="fun-fact-one__text">Products Designed</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="fun-fact-one__single content-margin-50">
                <h3 class="fun-fact-one__title counter">310</h3>
                <p class="fun-fact-one__text">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQs />
      <LogosSlider />
      <Footer />
    </div>
  );
};

export default AboutUs;
