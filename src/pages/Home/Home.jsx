import { lazy } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { services } from "../../constant";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const Banner = lazy(() => import("./components/Banner"));
const Testimonials = lazy(() => import("../../components/Testimonials"));
const MeetTheTeam = lazy(() => import("../../components/MeetTheTeam"));
const LogosSlider = lazy(() => import("../../components/LogosSlider"));
const WhatWeCanDo = lazy(() => import("../../components/WhatWeCanDo"));
const LocationMap = lazy(() => import("../../components/LocationMap"));

const Home = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <Banner />
      <section className="service-two sec-pad sec-pad-content-margin-30 thm-gray-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="block-title mb-0">
                <p className="block-title__tag-line ">All Categories</p>
                <h2 className="block-title__title">
                  Mudralanka Printing and Copy Centre Best in Your Town
                </h2>
              </div>
            </div>
            <div className="col-lg-6 d-flex">
              <div className="my-auto">
                <p className="service-two__title-text">
                  Mudralanka Printing and Copy Centre is your go-to destination
                  for top-notch printing and copying services. Known for
                  quality, reliability, and innovation, we cater to all your
                  personal and professional needs, making us the best in town.
                </p>
              </div>
            </div>
          </div>
          <div id="order-now" className="mt-5 pt-1">
            <p className="block-title__tag-line text-center mt-5">
              “ORDER ONLINE NOW”
            </p>
            <div className="row-5-col">
              {services.map((service) => (
                <div
                  // to={service.path}
                  key={service.title}
                  className="col-5-col"
                >
                  <div className="service-two__single hvr-float-shadow content-margin-30">
                    <img
                      src={service.image}
                      alt={service.title}
                      style={{
                        aspectRatio: "1 / 1",
                        borderRadius: "1rem",
                        objectPosition: "top",
                      }}
                    />
                    <p
                      className="banner-service-title"
                      style={{
                        border: "1px solid transparent",
                      }}
                    >
                      {/* <Link to={service.path}> */}
                      {service.title}
                      {/* </Link> */}
                    </p>
                    <Link
                      to={service.path}
                      style={{ marginTop: "10px" }}
                      className="service-four__link"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <WhatWeCanDo />
      <Testimonials />
      <LogosSlider />
      <MeetTheTeam />
      <section className="cta-two">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex">
              <div className="cta-two__content my-auto">
                <div className="block-title">
                  <p className="block-title__tag-line block-title__light-color">
                    Stationery Printing
                  </p>
                  <h2 className="block-title__title block-title__light-color">
                    Order for Business <br /> Stuff
                  </h2>
                </div>
                <ul className="cta-two__features">
                  <li className="cta-two__features-item ">
                    ✔ Professional designs with added fizz
                  </li>
                  <li className="cta-two__features-item ">
                    ✔ Create an army of business stationery
                  </li>
                  <li className="cta-two__features-item ">
                    ✔ Take your attention to detail up a level
                  </li>
                  <li className="cta-two__features-item ">
                    ✔ Totally safe for laser printers{" "}
                  </li>
                </ul>
                <Link to="/about" className="thm-btn cta-two__btn">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="/images/resources/cta-1-2.png"
                alt="cta"
                className="float-left"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="about-one sec-pad-top">
        <div className="container">
          <div className="block-title text-center">
            <p className="block-title__tag-line ">Our Introduction</p>
            <h2 className="block-title__title">About Mudralanka</h2>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="about-one__single content-margin-60">
                <h3 className="about-one__title">
                  <Link to="#">Best Printing Services</Link>
                </h3>
                <p className="about-one__text">
                  Discover top-notch print services tailored to meet all your
                  needs. From business cards and brochures to customized
                  merchandise and large-scale banners, we ensure high-quality
                  printing with vibrant colors, sharp details, and timely
                  delivery. Let us bring your ideas to life with professional,
                  reliable, and affordable printing solutions!
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-one__single content-margin-60">
                <h3 className="about-one__title">
                  <Link to="#">Trusted & Secure</Link>
                </h3>
                <p className="about-one__text">
                  At our print services, trust and security are our top
                  priorities. We handle your designs and data with the utmost
                  confidentiality, using secure systems to protect your
                  information. Count on us for reliable service, transparent
                  processes, and the assurance that your projects are in safe,
                  professional hands from start to finish.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-one__single content-margin-60">
                <h3 className="about-one__title">
                  <Link to="#">Customer Satisfaction</Link>
                </h3>
                <p className="about-one__text">
                  Customer satisfaction is at the heart of everything we do. We
                  strive to exceed your expectations with exceptional quality,
                  personalized support, and timely delivery. Your feedback
                  drives us to continually improve, ensuring every print project
                  meets your unique needs and leaves you completely satisfied.
                  Your happiness is our success!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className=" sec-pad sec-pad-content-margin-50 pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="video-one hvr-float-shadow content-margin-50">
                <img src="/images/resources/video-1-1.jpg" alt="Pic" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="download-one content-margin-50">
                <h3 className="download-one__title">
                  Download our Printing Design <br /> Guidelines
                </h3>

                <p className="download-one__text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text.
                </p>
                <div className="download-one__option">
                  <ul className="download-one__feature">
                    <li className="download-one__feature-item">
                      <span>Bleed:</span> 2.91” x 1.26”
                    </li>
                    <li className="download-one__feature-item">
                      <span>Trim:</span> 2.75” x 1.10”
                    </li>
                    <li className="download-one__feature-item">
                      <span>Safe:</span> 2.6” x 0.94”
                    </li>
                  </ul>
                  <div className="download-one__links">
                    <div className="download-one__links-row">
                      <Link
                        to="#"
                        className="download-one__link download-one__ps"
                      >
                        photoshop
                      </Link>
                      <Link
                        to="#"
                        className="download-one__link download-one__illu"
                      >
                        illustrator
                      </Link>
                    </div>
                    <div className="download-one__links-row">
                      <Link
                        to="#"
                        className="download-one__link download-one__ind"
                      >
                        inDesign
                      </Link>
                      <Link
                        to="#"
                        className="download-one__link download-one__jpg"
                      >
                        jpeg
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="cta-one thm-black-bg">
        <div className="container-fluid p-0">
          <div className="row flex-row-reverse">
            <div className="col-lg-6 d-flex">
              <div className="cta-one__content-block my-auto">
                <div className="block-title">
                  <p className="block-title__tag-line block-title__primary-color">
                    Order Now
                  </p>
                  <h2 className="block-title__title block-title__light-color">
                    Get a Free Sample <br /> to Feel Colors
                  </h2>
                </div>
                <p className="cta-one__text">
                  Order a sample so you can touch and feel our premium range of{" "}
                  <br />
                  papers and finishes for yourself. It’s free! Print full color
                  on both <br /> sides of your business cards.
                </p>
                <Link
                  to="/contact"
                  className="thm-btn thm-btn__base-bg cta-one__btn"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cta-one__image-block">
                <img src="/images/resources/cta-1-1.jpg" alt="Pic" />
                <div className="cta-one__image-block__content text-center">
                  <h3>
                    Printfinity Makes Every Business Card <br />
                    Unique & Professional
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="project-style-one sec-pad sec-pad-content-margin-80">
        <div className="container">
          <div className="block-title text-center">
            <p className="block-title__tag-line">Work Showcase</p>
            <h2 className="block-title__title">Recent Projects</h2>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="project-style-one__single content-margin-80">
                <div className="project-style-one__image-block">
                  <img src="/images/projects/project-1-1.jpg" alt="Pic" />
                </div>
                <div className="project-style-one__text-block thm-gray-bg text-center">
                  <span className="project-style-one__category">Printing</span>
                  <h3 className="project-style-one__title">
                    <Link to="#">Thick Paper Book</Link>
                  </h3>

                  <Link
                    to="#"
                    className="project-style-one__more-link text-white"
                  >
                    <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="project-style-one__single content-margin-80">
                <div className="project-style-one__image-block">
                  <img src="/images/projects/project-1-2.jpg" alt="Pic" />
                </div>
                <div className="project-style-one__text-block thm-gray-bg text-center">
                  <span className="project-style-one__category">Copying</span>
                  <h3 className="project-style-one__title">
                    <Link to="#">Ninety Nine You</Link>
                  </h3>

                  <Link
                    to="#"
                    className="project-style-one__more-link text-white"
                  >
                    <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="project-style-one__single content-margin-80">
                <div className="project-style-one__image-block">
                  <img src="/images/projects/project-1-3.jpg" alt="Pic" />
                </div>
                <div className="project-style-one__text-block thm-gray-bg text-center">
                  <span className="project-style-one__category">Printing</span>
                  <h3 className="project-style-one__title">
                    <Link to="#">Colorful Photo Print</Link>
                  </h3>

                  <Link
                    to="#"
                    className="project-style-one__more-link text-white"
                  >
                    <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LocationMap />
      <Footer />
    </div>
  );
};

export default Home;
