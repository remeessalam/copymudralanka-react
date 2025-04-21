import React, { useState } from "react";
import {
  FaInstagram,
  FaPhoneSquareAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { IoClose, IoMail } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { headerLinks, socialMediaLinks } from "../constant";
import { Link, useLocation } from "react-router-dom";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="site-header header-one">
      <div className="top-bar d-none d-lg-flex">
        <div className="container">
          {/* <div className="social-block d-none d-xl-flex">
            <a
              className="d-flex justify-content-center align-items-center"
              href={socialMediaLinks.whatsapp}
            >
              <FaWhatsapp size={18} />
            </a>
            <a
              className="d-flex justify-content-center align-items-center"
              href={socialMediaLinks.youtube}
            >
              <FaYoutube size={18} />
            </a>
            <a
              className="d-flex justify-content-center align-items-center"
              href={socialMediaLinks.instagram}
            >
              <FaInstagram size={18} />
            </a>
          </div> */}
          <div className="logo-block">
            <Link to="/">
              <img
                src="/images/resources/logo-1-3.png"
                className="logo"
                alt="logo"
              />
            </Link>
          </div>
          {/* <div className="d-md-flex d-none right-block">
            <a
              className="flex items-center"
              href="mailto:mudralankashop@gmail.com"
            >
              <IoMail className="text-white fill-primary mr-2" size={20} />
              mudralankashop@gmail.com
            </a>
            <a className="flex items-center" href="tel:+917799372747">
              <FaPhoneSquareAlt
                className="text-white fill-primary mr-2"
                size={20}
              />
              +917799372747
            </a>
          </div> */}
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light header-navigation stricky">
        <div className="container align-items-center clearfix">
          <div className="logo-box clearfix">
            <button
              onClick={toggleDrawer}
              className="menu-toggler"
              data-target="#main-nav-bar"
            >
              <GiHamburgerMenu size={28} />
            </button>
          </div>

          <div className="d-lg-none d-inline py-3">
            <Link to="/cart" className="text-dark mr-4">
              <FaCartShopping size={25} />
            </Link>
            <Link to="/">
              <img
                src="/images/resources/logo-1-3.png"
                className="mr-3 mr-md-0"
                style={{ width: "6rem" }}
                alt="logo"
              />
            </Link>
          </div>
          <div className="main-navigation" id="main-nav-bar">
            <ul className="navigation-box">
              {headerLinks.map((link) => (
                <li
                  key={link.path}
                  className={`${link.path === pathname && "current"}`}
                >
                  <Link to={link.path}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="right-side-box d-none d-lg-flex d-xl-none">
            <div className="header__social-block d-flex">
              <a
                className="d-flex justify-content-center align-items-center"
                href={socialMediaLinks.whatsapp}
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                className="d-flex justify-content-center align-items-center"
                href={socialMediaLinks.youtube}
              >
                <FaYoutube size={18} />
              </a>
              <a
                className="d-flex justify-content-center align-items-center"
                href={socialMediaLinks.instagram}
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="px-4"
      >
        <div className="mb-6 d-flex align-items-center justify-content-end py-3">
          <button
            onClick={() => setIsOpen(false)}
            className="text-black fs-4 close-btn"
          >
            <IoClose size={30} />
          </button>
        </div>
        <div className="d-flex flex-column">
          {headerLinks.map(({ title, path }) => (
            <Link
              onClick={() => setIsOpen(false)}
              key={title}
              className="mb-3 fs-2 text-dark"
              style={{ fontSize: "1.5rem" }}
              to={path}
            >
              {title}
            </Link>
          ))}
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
