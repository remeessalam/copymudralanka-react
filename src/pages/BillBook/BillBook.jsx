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

const sizes = ["3.8 x 7.8", "4 x 5.5", "5.5 x 8.5", "8.5 x 11"];
const images = [
  "/images/service-billbook/service-billbook1.png",
  "/images/service-billbook/service-billbook2.png",
  "/images/service-billbook/service-billbook3.png",
  "/images/service-billbook/service-billbook4.png",
  "/images/service-billbook/service-billbook5.png",
  "/images/service-billbook/service-billbook6.png",
];

const quantities = [
  { quantity: "1 (170.00 / Unit)", price: 170.0 },
  { quantity: "2 (130.00 / Unit)", price: 130.0 * 2 },
  { quantity: "3 (110.00 / Unit)", price: 110.0 * 3 },
  { quantity: "4 (100.00 / Unit)", price: 100.0 * 4 },
];
const BillBook = () => {
  const { productId } = useParams();
  const [cartItemId, setCartItemId] = useState(productId);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState("");
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const formData = new FormData();
  let selectedFile;
  const imgRef = useRef();
  const [data, setData] = useState({
    size: "Select Size",
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
            size: details.size,
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
        formData.append("size", data.size);
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

  // handle upload button click
  const handleButtonClick = () => {
    if (data.size === "Select Size" || data.quantity === "Select Quantity") {
      return toast("Please select a size and quantity", { id: "size" });
    }
    imgRef.current.click();
  };

  // handle add item to cart click
  const addItemToCart = async () => {
    if (data.size === "Select Size" || data.quantity === "Select Quantity") {
      toast("Please select a size and quantity", { id: "error" });
      return;
    }
    if (!imgUrl) {
      toast("Please select a design", { id: "image" });
      return;
    }
    try {
      setLoading(true);
      formData.append("size", data.size);
      formData.append("imageFile", data.file);
      formData.append("quantity", data.quantity);
      formData.append("category", "BILLBOOK");
      formData.append("userId", localStorage.getItem("userId") || "");
      formData.append("amount", data.price);

      const res = await addToCart(formData);
      if (res.data.status) {
        setData((prev) => ({ ...prev, isInCart: true }));
        setCartItemId(res.data.cartItem._id);
        toast.success("Item added to cart");
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
      formData.append("category", "BILLBOOK");
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

  // handle size change
  const handleSizeChange = (item) => {
    setData((prev) => ({ ...prev, size: item }));
    setDropdownOpen1(false);
    formData.append("size", item);
    formData.append("quantity", data.quantity);
    formData.append("amount", data.price);
    if (data.isInCart && item !== data.size) {
      updateCartItemData();
    }
  };

  // handle quantity change
  const handleQuantityChange = (item) => {
    setData((prev) => ({
      ...prev,
      quantity: item.quantity,
      price: item.price,
    }));
    setDropdownOpen2(false);
    formData.append("size", data.size);
    formData.append("quantity", item.quantity);
    formData.append("amount", item.price);
    if (data.isInCart && item.quantity !== data.quantity) {
      updateCartItemData();
    }
  };
  return (
    <div class="page-wrapper">
      <Header />
      <div class="main-container">
        <div class="inner-banner thm-black-bg text-center">
          <div class="container">
            <h2 class="inner-banner__title">Bill Book</h2>
            <ul class="thm-breadcrumb">
              <li class="thm-breadcrumb__item">
                <Link to="/">Home</Link>
              </li>
              <li class="thm-breadcrumb__item">
                <Link to="/services">Services</Link>
              </li>
              <li class="thm-breadcrumb__item">
                <span>Bill Book</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="section-oneContainer">
          <div class="images-container">
            <div class="image-gallery">
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
                {images.map((image) => (
                  <SwiperSlide key={image}>
                    <img src={image} alt="similar product" />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper1"
              >
                {images.map((image) => (
                  <SwiperSlide key={image}>
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

          <div class="details-container">
            <h2 class="main-heading">Bill Book</h2>
            <h5 class="fw-normal fs-5 mb-4">
              Perfect for invoices or using as receipt books
            </h5>
            <ul class="fw-medium fs-6 mb-3">
              <li>50 sheets per pad</li>
              <li>Available in 4 sizes</li>
              <li>90 gsm acid-free paper</li>
              <li>Magnetic option for fridges or desks</li>
              <li>
                Upload your own bill book design or customize with your logo and
                address
              </li>
              <li>Can also be used as – Notepads.</li>
              <li>
                <strong>
                  We don’t provide carbon copy OR pink / yellow copies OR serial
                  numbers
                </strong>
              </li>
            </ul>
            <i class="fw-semibold fs-6">Cash on Delivery available</i>
            <h5 class="fw-medium fs-6">
              Price below is MRP (inclusive of all taxes)
            </h5>
            {/* <ul>
              <li >
                View Specs & Templates to create your print-ready file. Fetching
                compatible options Quantity
              </li>
            </ul> */}
            {/* <div className="seeDetails">
              <span class="fw-bold text-decoration-underline ms-3">
                See Details
              </span>
              <span class="fw-bold text-decoration-underline ms-3">
                View Specs & Templates
              </span>
              <span class="fw-bold text-decoration-underline ms-2">
                to create your print-ready file.
              </span>
            </div> */}
            {/* <div className="billbookselection-container"> */}
            {/* <div class="dropdown-section option mb-4"> */}
            <div class="dropdown-Heading">
              <h4 class="fw-bold fs-5">Size</h4>
            </div>

            <div className="billbookselection-container">
              <div class="dropdown drop">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ background: "white" }}
                  onClick={() => setDropdownOpen1(!dropdownOpen1)}
                >
                  {data.size}
                </button>
                <div
                  className={`dropdown-menu ${dropdownOpen1 ? "show" : ""}`}
                  aria-labelledby="dropdownMenu2"
                >
                  {sizes.map((item) => (
                    <button
                      class="dropdown-item"
                      type="button"
                      value={item}
                      key={item}
                      onClick={() => handleSizeChange(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div class="dropdown drop">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ background: "white" }}
                  onClick={() => setDropdownOpen2(!dropdownOpen2)}
                >
                  {data.quantity}
                </button>
                <div
                  className={`dropdown-menu ${dropdownOpen2 ? "show" : ""}`}
                  aria-labelledby="dropdownMenu2"
                >
                  {quantities.map((item) => (
                    <button
                      class="dropdown-item"
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
            <button button onClick={handleButtonClick}>
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
              <div onClick={addItemToCart} className="mt-4 secondary-btn">
                Add to Cart
              </div>
            )}
            {/*
            <p class="satisfaction">
              <img
                src="/images/service-stickerPrinting/svg/guaranteedsatisfaction.svg
            "
                alt="upload"
              />
              100% satisfaction guaranteed
            </p> */}
          </div>
        </div>
        <div class="section-twoContainer">
          <div class="tab">
            <h3 class="">overview</h3>
          </div>
          <div class="details-container">
            <div class="section-two-details">
              <div>
                <h3>Custom bill books for your daily business transactions.</h3>
                <p>
                  Looking for an easy and unexpected way to build your personal
                  or professional brand? Consider custom bill books or notepads
                  featuring your name and logo.
                </p>
                <p>
                  Having a customized bill book or notepad adds a dash of
                  professionalism to your approach. At MudraLanka , you can
                  design Bill Books, Receipts Books or Notepads online, without
                  taking the effort of visiting your local vendor. Get
                  customized bill books or notepads, with premium quality paper
                  and hundreds of colorful designs that suit your business.
                  Choose from a variety of themes available with us or you can
                  upload your own design. You can go with a cardboard backside
                  or a magnetic backing to hang them on desks.
                </p>
                <p>
                  Ready to create? Start by browsing our assortment of fully
                  customisable designs. Once you’ve found a favourite, make it
                  yours by adding custom touches and choosing the option that
                  works best for you. After that, we’ll take care of the rest –
                  professionally printing and shipping your order. Your custom
                  creation will arrive looking crisp, polished and ready for its
                  first entry.
                </p>
                <h3>Creative ways to use your Bill Books.</h3>
                <p>
                  Are you looking for something specific? Check out these
                  on-trend templates for top industries - Food & Beverage,Travel
                  & Accommodation,Automotive & Transportation,Health &
                  Wellness,Education Services,Construction and Real
                  Estate,Jewellery,Entertainment & Recreation,Household
                  Services, and ,more.
                </p>

                <i>
                  MudraLanka India customizes all its products in facilities
                  located within India. Some of our raw materials, intermediate
                  components, and consumables used in the manufacturing of the
                  final product could be from one or more countries. As we
                  follow Global Sourcing, one product is likely to have a
                  different country of origin depending on the batch sold.
                </i>

                <h5>Country of Origin: India</h5>
                <p>
                  MudraLanka offers  Bill Books design templates in assorted
                  styles.
                </p>
              </div>
            </div>
            <div class="section-two-imageContainer">
              <img
                src="/images/service-billbook/service-details-image.png"
                alt="details"
                class=""
              />
            </div>
          </div>
        </div>
        <br />
        <RecentlyViwed category="Billbook" />
      </div>
      <Footer />
    </div>
  );
};

export default BillBook;
