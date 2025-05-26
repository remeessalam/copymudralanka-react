import { useContext, useEffect, useRef, useState } from "react";
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
import toast from "react-hot-toast";
import { SpinnerContext } from "../../components/SpinnerContext";
import { addToCart, getCartItemById, updateCartItem } from "../../apiCalls";
import RecentlyViwed from "../../components/RecentlyViwed";

const quantities = [
  { quantity: "1 (170.00 / Unit)", price: 170.0 },
  { quantity: "2 (130.00 / Unit)", price: 130.0 * 2 },
  { quantity: "3 (110.00 / Unit)", price: 110.0 * 3 },
  { quantity: "4 (100.00 / Unit)", price: 100.0 * 4 },
];

const images = [
  "/images/service-pvcidcard/service-pvcidcard1.png",
  "/images/service-pvcidcard/service-pvcidcard2.png",
  "/images/service-pvcidcard/service-pvcidcard3.png",
  "/images/service-pvcidcard/service-pvcidcard4.png",
  "/images/service-pvcidcard/service-pvcidcard5.png",
  "/images/service-pvcidcard/service-pvcidcard6.png",
];

const PvcIdCard = () => {
  const { productId } = useParams();
  const [cartItemId, setCartItemId] = useState(productId);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState("");
  const formData = new FormData();
  const imgRef = useRef();
  let selectedFile;
  const [data, setData] = useState({
    quantity: "Select Quantity",
    file: "",
    isInCart: false,
    url: "",
    price: 0,
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
            quantity: details.quantity,
            isInCart: true,
            url: details.imageFile,
            price: details.amount,
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
        formData.append("quantity", data.quantity);
        formData.append("amount", data.price);
        formData.append("imageFile", selectedFile);
        updateCartItemData();
      } else {
        toast.success("Image selected");
      }
    }

    // Reset file input value for consecutive uploads
    file.target.value = "";
  };

  // handle add item to cart click
  const addItemToCart = async () => {
    if (data.quantity === "Select Quantity") {
      toast("Please select quantity", { id: "error" });
      return;
    }
    if (!imgUrl) {
      toast("Please select a design", { id: "image" });
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("imageFile", data.file);
      formData.append("quantity", data.quantity);
      formData.append("amount", data.price);
      formData.append("category", "PVC_ID_CARD");
      formData.append("userId", localStorage.getItem("userId") || "");

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

  // handle upload button click
  const handleButtonClick = () => {
    if (data.quantity === "Select Quantity") {
      return toast("Please select a quantity", { id: "quantity" });
    }
    imgRef.current.click();
  };

  // update cart item
  const updateCartItemData = async () => {
    try {
      formData.append("category", "PVC_ID_CARD");
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

  // handle quantity change
  const handleQuantityChange = (item) => {
    setData((prev) => ({
      ...prev,
      quantity: item.quantity,
      price: item.price,
    }));
    formData.append("quantity", item.quantity);
    formData.append("amount", item.price);
    setDropdownOpen(false);
    if (data.isInCart && item.quantity !== data.quantity) {
      updateCartItemData();
    }
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="main-container">
        <div className="inner-banner thm-black-bg text-center">
          <div className="container">
            <h2 className="inner-banner__title">PVC ID CARD</h2>
            <ul className="thm-breadcrumb">
              <li className="thm-breadcrumb__item">
                <Link to="/">Home</Link>
              </li>
              <li className="thm-breadcrumb__item">
                <Link to="/services">Services</Link>
              </li>
              <li className="thm-breadcrumb__item">
                <span>PVC Id Card</span>
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
            <h2 className="main-heading">PVC ID CARD</h2>
            <p className="fw-normal fs-5 mb-4">
              Crafting Unique ID Cards to Reflect Your Identity
            </p>
            <h3 className="fw-semibold fs-6">Cash on Delivery available</h3>
            <ul className="fw-medium fs-6 mb-3">
              <li>Material: PVC 0.8 mm thickness card</li>
              <li>Finish: Semi-Gloss</li>
              <li>Size: 8.5 cm x 5.4 cm</li>
              <li>Both side printing available</li>
              <li>Decoration Technology: Digital Printing</li>
              <li>
                Looking for Personalised Lanyards?
                <Link
                  href="#"
                  className="text-primary text-decoration-underline"
                >
                  Click here
                </Link>
              </li>
              <li>
                Please do not print Aadhar Cards/PAN cards/Voter IDs/Driving
                License or any ID Cards/Lanyards belonging to
                Government/Government Authorities/Quasi Government bodies.
              </li>
              <li>
                You are solely accountable/liable for the product and its
                utilization in the event that it is found to be offensive,
                harmful, harassing, libelous, threatening, obscene, malicious,
                or otherwise objectionable or illegal.
              </li>
            </ul>
            <div className="dropdown-section mb-4">
              <div className="dropdown-Heading">
                <h4 className="fw-bold fs-5">Quantity</h4>
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
                  {data.quantity}
                </button>
                <div
                  className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                  aria-labelledby="dropdownMenu2"
                >
                  {quantities.map((item) => (
                    <button
                      className="dropdown-item"
                      type="button"
                      value={item.quantity}
                      key={item.quantity}
                      onClick={() => handleQuantityChange(item)}
                    >
                      {item.quantity}
                    </button>
                  ))}
                </div>
              </div>
            </div>

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
          </div>
        </div>
        <div className="section-twoContainer">
          <div className="tab">
            <h3 className="">overview</h3>
          </div>
          <div className="details-container">
            <div className="section-two-details">
              <div>
                <h3>
                  Design and print custom ID cards that reflect your
                  organisation's brand and identity.
                </h3>
                <p>
                  Are you seeking a reliable and efficient solution for creating
                  and printing custom ID cards that mirror your organisation's
                  distinct brand and identity? Look no further! MudraLanka
                  specialises in providing top-notch ID card printing services
                  tailored to your unique requirements. Whether you need
                  employee ID cards or student IDs, we've got you covered.
                </p>
                <p>
                  Our professional ID cards can include essential details such
                  as photos, names, titles, and any other relevant information
                  you require. We understand the importance of a secure and
                  professional Identity card and guarantee that your cards will
                  meet these standards.
                </p>
                <p>
                  Ready to order your custom office ID cards? Our user-friendly
                  online platform makes it a breeze. We guarantee sharp,
                  vibrant, and long-lasting ID cards using top-of-the-line
                  printing technology. Simply upload your company logo, employee
                  name, message, photo, or any other specifications, and witness
                  them come to life on your identity cards online. Once you've
                  finalised your design, sit back and relax—let us handle the
                  rest, ensuring a seamless printing and delivery process.
                </p>
                <h5>
                  Note: We do NOT print any Government ID Cards / Aadhar Cards
                  /PAN cards / Voter IDs / Driving License. You may also be
                  asked to provide an authorisation letter.
                </h5>

                <p>
                  Identity cards are thick PVC cards with a Semi Glossy finish
                  and are customisable on both sides. They come with a sturdy
                  and transparent PVC holder but without a lanyard (strap worn
                  around the neck).
                </p>
                <p>
                  MudraLanka India customizes all its products in facilities
                  located within India. Some of our raw materials, intermediate
                  components, and consumables used in the manufacturing of the
                  final product could be from one or more countries. As we
                  follow Global Sourcing, one product is likely to have a
                  different country of origin depending on the batch sold.
                </p>
                <h5>Country of origin: India</h5>
              </div>
            </div>
            <div className="section-two-imageContainer">
              <img
                src="/images/service-pvcidcard/service-details-image.png"
                alt="details"
                className=""
              />
            </div>
          </div>
        </div>
        <br />
        <RecentlyViwed category="PVC ID Card" />
      </div>
      <Footer />
    </div>
  );
};

export default PvcIdCard;
