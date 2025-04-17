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
import VisitingCardEditor from "./VisitingCardEditor";
import { convertBase64intoFile } from "../../utils/helper";
import imageCompression from "browser-image-compression";
import { IoMdCloseCircle } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
// import { useImageContext } from "../../components/imageContext";
const quantityOptions = [
  {
    quantity: "100",
    price: 200.0,
    savings: "",
    recommended: false,
  },
  {
    quantity: "200",
    price: 340.0,
    savings: "15% savings",
    recommended: true,
  },
  {
    quantity: "300",
    price: 480.0,
    savings: "20% savings",
    recommended: false,
  },
  {
    quantity: "400",
    price: 600.0,
    savings: "25% savings",
    recommended: false,
  },
  {
    quantity: "500",
    price: 700.0,
    savings: "30% savings",
    recommended: false,
  },
];

const images = [
  "/images/service-visitingcard/service-visitingcard1.png",
  "/images/service-visitingcard/service-visitingcard2.png",
  "/images/service-visitingcard/service-visitingcard3.png",
  "/images/service-visitingcard/service-visitingcard4.png",
  "/images/service-visitingcard/service-visitingcard5.png",
];

const VisitingCard = () => {
  const { productId } = useParams();
  const [cartItemId, setCartItemId] = useState(productId);
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const formData = new FormData();
  let selectedFile;

  const imgRef = useRef();
  const [data, setData] = useState({
    quantity: "",
    price: "",
    isInCart: false,
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

  // console.log(image, "asdfasdfsdf");
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
      // addImage(selectedFile);
      localStorage.setItem("selectedImage", URL.createObjectURL(selectedFile));
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

  // handle upload button click
  const handleButtonClick = () => {
    if (!data.quantity) {
      return toast("Please select a  quantity", { id: "quantity" });
    }
    imgRef.current.click();
  };

  // handle add item to cart click
  const addItemToCart = async () => {
    if (!data.quantity) {
      toast("Please select a  quantity", { id: "quantity" });
      return;
    }
    if (!imgUrl) {
      toast("Please select a design", { id: "image" });
      return;
    }
    try {
      setLoading(true);

      const compressedFile = await compressImage(data.file);
      formData.append("imageFile", compressedFile);
      formData.append("quantity", data.quantity);
      formData.append("category", "VISITING_CARD");
      formData.append("userId", localStorage.getItem("userId") || "");
      formData.append("amount", data.price);

      const res = await addToCart(formData);
      console.log(res, "htiasdfikasdjf");
      if (res.data.status === false && res.data.error.code === "413") {
        return toast.error("The image file is too large.");
      }
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
      formData.append("category", "VISITING_CARD");
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
    if (data.isInCart && item.quantity !== data.quantity) {
      updateCartItemData();
    }
  };

  // handle image save after edit
  const handleImageSave = (newImageUrl) => {
    const file = convertBase64intoFile(newImageUrl);
    setData((prev) => ({ ...prev, file: file }));
    setImgUrl(newImageUrl); // Update the imageUrl state
    if (data.isInCart) {
      formData.append("imageFile", file);
      formData.append("quantity", data.quantity);
      formData.append("amount", data.price);
      updateCartItemData();
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1, // Maximum file size in MB
      maxWidthOrHeight: 1920, // Resize to fit within this dimension
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };

  return (
    <div class="page-wrapper">
      <Header />
      <div class="main-container">
        <div class="inner-banner thm-black-bg text-center">
          <div class="container">
            <h2 class="inner-banner__title">Visiting Cards Printing</h2>
            <ul class="thm-breadcrumb">
              <li class="thm-breadcrumb__item">
                <Link to="/">Home</Link>
              </li>
              <li class="thm-breadcrumb__item">
                <Link to="/services">Services</Link>
              </li>
              <li class="thm-breadcrumb__item">
                <span>Visiting Cards Printing</span>
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
                  <SwiperSlide>
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
                {images.map((image) => (
                  <SwiperSlide>
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
            <h2 class="main-heading">Standard Visiting Cards</h2>
            <h5 class="fw-normal fs-5 mb-4">
              Personalized cards with a professional look.
            </h5>
            <ul class="fw-medium fs-6 mb-3 visitingcardlist">
              <li>4000+ design options available</li>
              <li>
                Dimension shown on the design page includes bleed area (safety
                area),{" "}
                <strong>the final card size will be 8.9 cm x 5.1 cm</strong>
              </li>
              <li>
                Stretch your design up to the Bleed area to avoid white borders
                appearing around your card. Keep all your information within the
                safety area.
              </li>
              <li>
                <strong>
                  Choose bold fonts size 10 and above when using white text
                </strong>
              </li>
              <li>
                Need help in designing? You can avail our{" "}
                <Link to={"#"}>Design Services</Link>
              </li>
              <li>
                <strong>
                  Note: Please do not print designs belonging to
                  Government/Quasi Government bodies
                </strong>
              </li>
            </ul>
            <div class="dropdown-section mb-1 pt-3">
              <div class="dropdown-Heading">
                <h4 class="fw-bold fs-5">Quantity</h4>
              </div>
            </div>

            <div class="list-group">
              {quantityOptions.map((item) => (
                <div
                  className={`${
                    data.quantity === item.quantity
                      ? "quality-list-container-activelink"
                      : "quality-list-container"
                  }`}
                  onClick={() => handleQuantityChange(item)}
                  key={item.quantity}
                >
                  <div className="quality-list-first">
                    <span>{item.quantity}</span>
                    {item.recommended && (
                      <span className="quality-list-chip">Recommended</span>
                    )}
                    <div className="text-end">
                      <p className="mb-0 fw-medium">₹{item.price}</p>
                      <small className="quality-list-small">
                        ₹{item.price / item.quantity} / unit
                      </small>
                    </div>
                  </div>
                  <small className="text-secondary">{item.savings}</small>
                </div>
              ))}
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
                  position: "relative",
                }}
              >
                <div
                  style={{ position: "absolute", top: "0px", right: "0px" }}
                  onClick={() => {
                    setImgUrl("");
                    setData((prev) => ({
                      ...prev,
                      file: "",
                    }));
                  }}
                >
                  <FaTrashAlt style={{ width: "22px", height: "22px" }} />
                </div>
                <img
                  src={imgUrl}
                  style={{ height: "15rem", objectFit: "cover" }}
                  alt=""
                />
              </div>
            )}

            {/* <VisitingCardEditor image={imgUrl} /> */}
            {!imgUrl && (
              <Link
                to={"/editvisiting-card"}
                style={{ textDecoration: "none" }}
              >
                <button className="secondary-btn w-auto mx-auto mt-3">
                  Edit Visiting Card
                </button>
              </Link>
            )}
            {/* <VisitingCardEditor
              image={imgUrl}
              onImageSave={handleImageSave}
              handleButtonClick={handleButtonClick}
            /> */}

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
          </div>
        </div>
        <div class="section-twoContainer">
          <div class="tab">
            <h3 class="">overview</h3>
          </div>
          <div class="details-container">
            <div class="section-two-details">
              <div>
                <h3>
                  Your business is one of a kind. Now your Visiting Card can be,
                  too.
                </h3>
                <p>
                  With a fresh box of professional visiting cards comes
                  confidence – the knowledge that you’re prepared for every
                  opportunity that comes your way. Whether you’re making first
                  impressions, rewarding regulars with a loyalty card or giving
                  satisfied clients your contact info for next time, we’re here
                  to help you look and feel ready to impress.
                </p>
                <p>
                  As you design, we’ll offer you a wide range of personalisation
                  options – including paper stocks and finish options – that
                  could work for your style, business and budget.
                </p>
                <h3>Creative ways to use your visiting cards.</h3>
                <p>
                  Are you looking for something specific? Check out these
                  on-trend templates for top industries –Legal,Accounting & Tax
                  Advice,Bakeries,Auto Dealers,Music,Beauty & Spa,Agriculture &
                  Farming,Medical Professionals,Taxi Service,Graphic
                  Design,Courier Services, and ,more
                </p>
                <p>
                  For Bulk orders exceeding Rs. 20,000 in value, contact our
                  Customer Care for any assistance.
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
                  MudraLanka offers Standard Visiting Cards design templates in
                  assorted styles.
                </p>
              </div>
            </div>
            <div class="section-two-imageContainer">
              <img
                src="/images/service-visitingcard/service-details-image.png"
                alt="details"
                class=""
              />
            </div>
          </div>
        </div>
        <br />
        {/* <div class="section-threeContainer">
          <h3>Related products</h3>
          <div class="relatedproduct-container">
            {relatedProducts.map((obj) => (
              <div key={obj.id} class="relatedproducd-one">
                <img src={obj.img} alt="related product" />
                <h4>{obj.title}</h4>
                <p>{obj.text}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default VisitingCard;
