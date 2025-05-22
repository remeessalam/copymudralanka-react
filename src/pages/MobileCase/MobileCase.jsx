import React, { useContext, useEffect, useRef, useState } from "react";
import "../StickerPrinting/StickerPrinting.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { relatedProducts, sendEmailLink } from "../../constant";
import toast from "react-hot-toast";
import { SpinnerContext } from "../../components/SpinnerContext";
import { addToCart, getCartItemById, updateCartItem } from "../../apiCalls";
import RecentlyViwed from "../../components/RecentlyViwed";

const brand = ["Apple", "Samsung", "OnePlus", "Nothing"];
const images = [
  "/images/service-mobilecase/service-mobilecase1.png",
  "/images/service-mobilecase/service-mobilecase2.png",
  "/images/service-mobilecase/service-mobilecase3.png",
  "/images/service-mobilecase/service-mobilecase4.png",
  "/images/service-mobilecase/service-mobilecase5.png",
  "/images/service-mobilecase/service-mobilecase6.png",
];

const MobileCase = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [screenGuard, setScreenGuard] = useState(false);
  const [keyChain, setKeyChain] = useState(false);
  const imgRef = useRef();
  const { productId } = useParams();
  const [cartItemId, setCartItemId] = useState(productId);
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const formData = new FormData();
  let selectedFile;

  const [data, setData] = useState({
    brand: "Select Mobile Brand",
    file: "",
    price: 250,
    isInCart: false,
    url: "",
  });
  const { setLoading } = useContext(SpinnerContext);

  useEffect(() => {
    getProductById();
  }, []);

  // get product details if id is present
  const getProductById = async () => {
    if (cartItemId) {
      try {
        const res = await getCartItemById(cartItemId);
        if (res.data.status) {
          const details = res.data.cartItem;
          setData((prev) => ({
            ...prev,
            isInCart: true,
            url: details.imageFile,
            price: details.amount,
            brand: details.brand,
          }));
          setImgUrl(details.imageFile);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  // on image change
  const onImgChange = (file) => {
    if (file.target.files && file.target.files[0]) {
      selectedFile = file.target.files[0];

      // Validate file type
      const validFileTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validFileTypes.includes(selectedFile.type)) {
        toast.error("Select a valid image file (PNG, JPEG, JPG)");
        return;
      }

      // Validate file size (max size: 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (selectedFile.size > maxSizeInBytes) {
        toast.error("File size should not exceed 5MB");
        return;
      }

      setData((prev) => ({
        ...prev,
        file: selectedFile,
      }));
      setImgUrl(URL.createObjectURL(selectedFile));

      // update cart item if already in cart
      if (data.isInCart) {
        formData.append("brand", data.brand);
        formData.append("imageFile", selectedFile);
        updateCartItemData();
      } else {
        toast.success("Image selected");
      }
    }

    // Reset file input value for consecutive uploads
    file.target.value = "";
  };

  // handle upload button click
  const handleButtonClick = () => {
    if (data.brand === "Select Mobile Brand") {
      return toast("Please select a brand", { id: "brand" });
    } else {
      imgRef.current.click();
    }
  };

  // handle add item to cart click
  const addItemToCart = async () => {
    if (data.brand === "Select Mobile Brand") {
      toast("Please select a brand", { id: "brand" });
      return;
    }
    if (!imgUrl) {
      toast("Please select a design", { id: "image" });
      return;
    }

    try {
      setLoading(true);
      formData.append("imageFile", data.file);
      formData.append("category", "MOBILE_CASE");
      formData.append("userId", localStorage.getItem("userId") || "");
      formData.append("amount", data.price);
      formData.append("brand", data.brand);

      const res = await addToCart(formData);
      if (res.data.status) {
        setData((prev) => ({ ...prev, isInCart: true }));
        toast.success("Item added to cart");
        setCartItemId(res.data.cartItem._id);
      } else {
        toast.error(res.data.error);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // update cart item
  const updateCartItemData = async () => {
    try {
      formData.append("category", "MOBILE_CASE");
      formData.append("amount", data.price);
      formData.append("userId", localStorage.getItem("userId") || "");
      const res = await updateCartItem(cartItemId, formData);
      if (res.data.status) {
        toast.success("Item updated in cart");
      } else {
        toast.error(res.data.error);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleScreenGuardChange = (e) => {
    setScreenGuard(e.target.checked);
  };

  const handleKeyChainChange = (e) => {
    setKeyChain(e.target.checked);
  };

  // handle brand change
  const handleBrandChange = (item) => {
    setData((prev) => ({
      ...prev,
      brand: item,
    }));
    formData.append("brand", item);
    setDropdownOpen(false);
    if (data.isInCart && item !== data.brand) {
      updateCartItemData();
    }
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="main-container">
        <div className="inner-banner thm-black-bg text-center">
          <div className="container">
            <h2 className="inner-banner__title">Mobile Case Printing</h2>
            <ul className="thm-breadcrumb">
              <li className="thm-breadcrumb__item">
                <Link to="/">Home</Link>
              </li>
              <li className="thm-breadcrumb__item">
                <Link to="/services">Services</Link>
              </li>
              <li className="thm-breadcrumb__item">
                <span>Mobile Case Printing</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-oneContainer">
          <div className="images-container">
            <div className="image-gallery">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                  alignItems: "center",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper22"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt="similar product" />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                // loop={true}
                spaceBetween={10}
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper1"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt="similar product"
                      style={{ aspectRatio: "1/1", objectFit: "cover" }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="details-container">
            <h2 className="main-heading">Mobile Case Printing</h2>
            <p className="fw-normal fs-5 mb-4">
              Crafting Unique ID Cards to Reflect Your Identity
            </p>
            <h3 className="fw-semibold fs-6">Cash on Delivery available</h3>
            <ul className="fw-medium fs-6 mb-3">
              <li>Thin & light Poly-carbonate case</li>
              <li>Smooth & seam-free surface</li>
              <li>Photo-realistic print quality</li>
              <li>Hassle-free replacements</li>
              <li>Delivery in 5-7 working days</li>
            </ul>
            <div className="dropdown-section mb-4">
              <div className="dropdown-Heading">
                <h4 className="fw-bold fs-5">Mobile Brand</h4>
              </div>

              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ background: "white" }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {data.brand}
                </button>
                <div
                  className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                  aria-labelledby="dropdownMenu2"
                >
                  {brand.map((item) => (
                    <button
                      className="dropdown-item"
                      type="button"
                      value={item}
                      key={item}
                      onClick={() => handleBrandChange(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="dropdown-Heading">
              <h4 className="fw-bold fs-5">Price : ₹ {data.price}</h4>
            </div>
            {/* <div>
              <label className="addonitems">
                <input
                  type="checkbox"
                  name="flexible-glass"
                  checked={screenGuard}
                  onChange={handleScreenGuardChange}
                />
                Add Flexible Glass Screen Guard <s>99.00</s> 29.00
              </label>
              <label className="addonitems">
                <input
                  type="checkbox"
                  name="key-chain"
                  checked={keyChain}
                  onChange={handleKeyChainChange}
                />
                Add Same Design Key Chain 99.00 29.00
              </label>
            </div> */}

            <h4
              style={{ fontSize: "16px", fontWeight: "600", marginTop: "2rem" }}
            >
              Have a design? You can upload it using the upload button. Our
              designer will redesign it and confirm with you before printing.
              Upload Design
            </h4>
            <input
              name="myImg"
              hidden
              accept="image/png,image/jpeg,image/jpg"
              onChange={(e) => onImgChange(e)}
              ref={imgRef}
              type="file"
            />
            <button onClick={handleButtonClick}>
              Upload
              <img
                src="/images/service-stickerPrinting/svg/UploadIcon.svg"
                alt="upload"
              />
            </button>
            {imgUrl && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <img
                  src={imgUrl}
                  style={{ height: "15rem", objectFit: "cover" }}
                  alt=""
                />
              </div>
            )}
            {data.isInCart ? (
              <div
                onClick={() => navigate("/cart")}
                className="mt-4 secondary-btn"
              >
                Go to Cart
              </div>
            ) : (
              <div
                onClick={() => addItemToCart()}
                className="mt-4 secondary-btn"
              >
                Add to Cart
              </div>
            )}
            {/* <p className="satisfaction">
              <img
                src="/images/service-stickerPrinting/svg/guaranteedsatisfaction.svg
            "
                alt="upload"
              />
              100% satisfaction guaranteed
            </p> */}
          </div>
        </div>
        <div className="section-twoContainer">
          <div className="tab">
            <h3 className="">overview</h3>
          </div>
          <div className="details-container">
            <div className="section-two-details">
              <div>
                <h3>Additional Information</h3>
                <p>
                  <strong>MATERIAL:</strong> Impact resistant and highly durable
                  polycarbonate.
                </p>
                <p>
                  <strong> PRINT:</strong> Matte finish ultra HD Lifetime
                  warranty on print. Super-bright colors embedded directly into
                  the case. Made with high precision to get a crisp clear print.
                  The Colorful patterns let you express your unique personality.
                  Our Unique Edge-to-edge Printing technology provides a smooth
                  clean look that really stands out from ordinary Mobile Back
                  Covers & Cases.
                </p>
                <p>
                  <strong> PRODUCT SPECIALITY:</strong> Slim fitting with design
                  wrapping around side of the case and full access to ports.
                </p>
                <p>Compatible with standard wireless charging.</p>
                <p>
                  Despite a very thin profile and Weight 15 Gram(
                  <strong>Negligible Weight</strong>)
                </p>
                <p>the case is much stronger than it looks at first sight.</p>
                <p>
                  <strong> PRODUCT DETAILS:</strong> Slim, One-piece, Clip-on,
                  Light, Durable Polycarbonate Protective Hard Case.
                </p>
                <p>
                  Includes cut-outs for your regular charger and headphones.
                  Provides Easy Protection for Your Smartphone.
                </p>
                <p>
                  All side design Case covers 100% of the outer surface of the
                  phone.
                </p>
                <p>Precision molded with no seams or sharp edges.</p>
                <p>
                  High quality printing No peeling, chipping, or wearing off.
                </p>
                <p>
                  <strong>Please Note:</strong>
                  Colors May Slightly Vary Depending on Your Screen Brightness.
                </p>
                <p>Additional Product Information</p>
                <h5>Net quantity: 1 </h5>
                <h5>Country of Origin: India</h5>
              </div>
            </div>
            <div className="section-two-imageContainer">
              <img
                src="/images/service-mobilecase/service-details-image.png"
                alt="details"
                className=""
              />
            </div>
          </div>
        </div>
        <br />
        <RecentlyViwed category="Mobile Case Printing" />
      </div>
      <Footer />
    </div>
  );
};

export default MobileCase;
