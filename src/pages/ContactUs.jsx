import React, { lazy } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { socialMediaLinks } from "../constant";
const LocationMap = lazy(() => import("../components/LocationMap"));

const ContactUs = () => {
  return (
    <div class="page-wrapper">
      <Header />
      <div class="inner-banner thm-black-bg text-center">
        <div class="container">
          <h2 class="inner-banner__title">Contact Us</h2>
          <ul class="thm-breadcrumb">
            <li class="thm-breadcrumb__item">
              <a href="#">Home</a>
            </li>
            <li class="thm-breadcrumb__item">
              <span>Contact Us</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="contact-block-one sec-pad sec-pad-content-margin-50">
        <div class="container">
          <div class="block-title text-center">
            <p class="block-title__tag-line">Contact Us</p>
            <h2 class="block-title__title">Get in Touch With Us</h2>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="contact-block-one__form content-margin-50">
                <input type="text" name="name" placeholder="Your name" />
                <input type="text" name="email" placeholder="Email address" />
                <textarea name="message" placeholder="Write message"></textarea>
                <button type="submit">Send Message</button>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="contact-block-one__info content-margin-50 thm-black-bg">
                <p class="contact-block-one__info-item">+917799372747</p>
                <p class="contact-block-one__info-item">
                  mudralankashop@gmail.com
                </p>
                <p class="contact-block-one__info-item">
                  17-132, Ponniamman Koil Street, Chittoor, Andhra Pradesh,
                  India
                </p>
                <div class="social-block d-flex contact_us_social_media_links">
                  <a className="d-flex justify-content-center align-items-center" href={socialMediaLinks.whatsapp}>
                    <FaWhatsapp size={18} />
                  </a>
                  <a className="d-flex justify-content-center align-items-center" href={socialMediaLinks.youtube}>
                    <FaYoutube size={18} />
                  </a>
                  <a className="d-flex justify-content-center align-items-center" href={socialMediaLinks.instagram}>
                    <FaInstagram size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LocationMap />
      <Footer />
    </div>
  );
};

export default ContactUs;
