import { useState, useRef, useEffect } from "react";
import { FaInstagram, FaWhatsapp, FaYoutube, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { headerLinks, socialMediaLinks, services } from "../constant";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Handle search functionality
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Filter services based on search query
    const filteredServices = services.filter((service) =>
      service.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredServices);
    setShowSearchResults(true);
  };

  // Handle search result click
  const handleSearchResultClick = (servicePath) => {
    console.log(searchResults, "asdfasdfrwsdfsdfsfdsf");
    navigate(servicePath);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.stopPropagation();

    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchResultClick(searchResults[0].path);
    }
  };

  // Close search results when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (searchRef.current && !searchRef.current.contains(event.target)) {
  //       setShowSearchResults(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="site-header header-one">
      <div className="top-bar d-none d-lg-flex">
        <div className="container">
          <div className="logo-block">
            <Link to="/">
              <img
                src="/images/resources/logo-1-3.png"
                className="logo"
                alt="logo"
              />
            </Link>
          </div>
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

          {/* Search Bar - Desktop */}

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
          <div
            className="mudralanka-search-container d-none d-lg-block"
            ref={searchRef}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="mudralanka-search-form"
            >
              <div className="mudralanka-search-input-wrapper">
                <input
                  type="text"
                  className="mudralanka-search-input"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() =>
                    searchResults.length > 0 && setShowSearchResults(true)
                  }
                />
                <button type="submit" className="mudralanka-search-btn">
                  <FaSearch size={16} />
                </button>
              </div>
              {showSearchResults && searchResults.length > 0 && (
                <div className="mudralanka-search-results">
                  {searchResults.map((service, index) => {
                    console.log(
                      searchResults,
                      service.path,
                      "asdfasdfasdfsdfs"
                    );
                    return (
                      <Link
                        to={service.path}
                        key={index}
                        className="mudralanka-search-result-item"
                        onClick={(e) => {
                          // e.stopPropagation();
                          console.log(
                            searchResults,
                            service.path,
                            "asdfasdfasdfsdfs"
                          );
                          handleSearchResultClick(service.path);
                        }}
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          className="mudralanka-search-result-img"
                        />
                        <span className="mudralanka-search-result-title">
                          {service.title}asdf
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </form>
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

      {/* Mobile Drawer */}
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

        {/* Mobile Search Bar */}
        <div
          className="mudralanka-mobile-search-container mb-4"
          ref={searchRef}
        >
          <form
            onSubmit={handleSearchSubmit}
            className="mudralanka-search-form"
          >
            <div className="mudralanka-search-input-wrapper">
              <input
                type="text"
                className="mudralanka-search-input"
                placeholder="Search services..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() =>
                  searchResults.length > 0 && setShowSearchResults(true)
                }
              />
              <button type="submit" className="mudralanka-search-btn">
                <FaSearch size={16} />
              </button>
            </div>
            {showSearchResults && searchResults.length > 0 && (
              <div className="mudralanka-search-results">
                {searchResults.map((service, index) => (
                  <div
                    key={index}
                    className="mudralanka-search-result-item"
                    onClick={() => {
                      handleSearchResultClick(service.path);
                      setIsOpen(false);
                    }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="mudralanka-search-result-img"
                    />
                    <span className="mudralanka-search-result-title">
                      {service.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
