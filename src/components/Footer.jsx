import React from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { headerLinks, socialMediaLinks } from "../constant";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="upper-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="content-block">
                <Link to="#">
                  <img
                    src="/images/resources/logo-1-1.png"
                    className="logo"
                    alt="logo"
                  />
                </Link>
                <div className="menu-link">
                  <Link to="#">Terms of use</Link>
                  <span className="sep">.</span>
                  <Link to="#">Privacy policy</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form action="#" className="subscribe-form">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter email address"
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="main-footer">
        <div className="container">
          <div className="inner-container">
            <div className="row">
              <div className="col-lg-5">
                <div className="footer-widget contact-widget">
                  <div className="widget-title">
                    <h3>Contact</h3>
                  </div>
                  <p>+917799372747</p>
                  <p>mudralankashop@gmail.com</p>
                  <p>
                    17-132, Ponniamman Koil Street, Chittoor, Andhra Pradesh,
                    India
                  </p>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="footer-widget">
                  <div className="widget-title">
                    <h3>Explore</h3>
                  </div>
                  <ul className="link-list">
                    {headerLinks.map((link) => (
                      <li key={link.path}>
                        <Link to={link.path}>{link.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="footer-widget">
                  <div className="widget-title">
                    <h3>About Mudralanka</h3>
                  </div>
                  <p>
                    We specialize in delivering high-quality printing solutions
                    tailored to your needs, ensuring professional results and
                    customer satisfaction.
                  </p>
                  <div className="social-block d-flex">
                    <a className="d-flex justify-content-center align-items-center" href={socialMediaLinks.whatsapp}>
                      <FaWhatsapp size={20} />
                    </a>
                    <a className="d-flex justify-content-center align-items-center" href={socialMediaLinks.youtube}>
                      <FaYoutube size={20} />
                    </a>
                    <a className="d-flex justify-content-center align-items-center" href={socialMediaLinks.instagram}>
                      <FaInstagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-footer text-center">
        <div className="container">
          <div className="inner-container">
            <p>&copy; 2024 Mudralanka. All rights reserved. </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
