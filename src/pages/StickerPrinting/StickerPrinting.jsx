import React, { useContext, useEffect, useRef, useState } from "react";
import "./StickerPrinting.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { relatedProducts } from "../../constant";
import toast from "react-hot-toast";
import { SpinnerContext } from "../../components/SpinnerContext";
import {
  addToCart,
  getCartItemById,
  removeBackgrounds,
  updateCartItem,
} from "../../apiCalls";
import VisitingCardEditor from "../VisitingCard/VisitingCardEditor";
import { convertBase64intoFile } from "../../utils/helper";
import imageCompression from "browser-image-compression";

const sizes = ["48x34", "72x34", "96x34", "120x34"];

const images = [
  "/images/service-stickerPrinting/service-stickerPrintingimg1.png",
  "/images/service-stickerPrinting/service-stickerPrintingimg2.png",
  "/images/service-stickerPrinting/service-stickerPrintingimg3.png",
  "/images/service-stickerPrinting/service-stickerPrintingimg4.png",
  "/images/service-stickerPrinting/service-stickerPrintingimg5.png",
  "/images/service-stickerPrinting/service-stickerPrintingimg6.png",
];

const quantities = [
  {
    quantity: 24,
    price: 940,
    isRecommended: false,
    savings: "2%",
  },
  {
    quantity: 48,
    price: 1880,
    isRecommended: true,
    savings: "4%",
  },
  {
    quantity: 96,
    price: 3770,
    isRecommended: false,
    savings: "6%",
  },
  {
    quantity: 144,
    price: 5560,
    isRecommended: false,
    savings: "8%",
  },
];

const StickerPrinting = () => {
  const { productId } = useParams();
  const [cartItemId, setCartItemId] = useState(productId);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const formData = new FormData();
  const [backgroundRemoved, setBackgroundRemoved] = useState(false);
  let selectedFile;

  const imgRef = useRef();
  const [data, setData] = useState({
    size: "Select Size",
    quantity: "",
    file: "",
    isInCart: false,
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
          const itemQuantity = quantities.find(
            (quantity) => quantity.price === details.amount
          );
          setData((prev) => ({
            ...prev,
            size: details.size,
            quantity: itemQuantity.quantity,
            isInCart: true,
            price: details.amount,
            file: details.imageFile,
          }));
          setBackgroundRemoved(details.isBackgroundRemoved);
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
    if (data.size === "Select Size" || data.quantity === "") {
      return toast("Please select a size and quantity", { id: "size" });
    }
    if (data.quantity === "") {
      return toast("Please select a size and quantity", { id: "quantity" });
    }
    imgRef.current.click();
  };

  // handle add item to cart click
  const addItemToCart = async () => {
    if (data.size === "Select Size" || data.quantity === "") {
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
      if (backgroundRemoved) {
        formData.append("imageUrl", imgUrl);
      } else {
        const compressedFile = await compressImage(data.file);

        formData.append("imageFile", compressedFile);
      }
      formData.append("quantity", data.quantity);
      formData.append("category", "STICKER_PRINTING");
      formData.append("userId", localStorage.getItem("userId") || "");
      formData.append("amount", data.price);
      formData.append("isBackgroundRemoved", backgroundRemoved);

      const res = await addToCart(formData);
      console.log(res, "thalskdfjasdf");
      if (res.data.status === false && res.data.error.code === "413") {
        return !res.data.status
          ? toast.error(res.data.error.message)
          : toast.error(res.data.error);
      }
      if (res.data.status) {
        setData((prev) => ({
          ...prev,
          isInCart: true,
          file: res.data.cartItem.imageFile,
        }));
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
      formData.append("category", "STICKER_PRINTING");
      formData.append("userId", localStorage.getItem("userId") || "");
      formData.append("isBackgroundRemoved", backgroundRemoved);
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
    setDropdownOpen(false);
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
    formData.append("size", data.size);
    formData.append("quantity", item.quantity);
    formData.append("amount", item.price);
    if (data.isInCart && item.quantity !== data.quantity) {
      updateCartItemData();
    }
  };

  // handle remove background when click remove background button
  const removeBackground = async () => {
    if (!data.file) {
      toast.error("Please select an image first");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      if (cartItemId) {
        formData.append("imageUrl", data.file);
        formData.append("cartItemId", cartItemId);
      } else {
        const compressedFile = await compressImage(data.file);
        formData.append("imageFile", compressedFile);
      }
      const result = await removeBackgrounds(formData);
      if (result.data.status) {
        setImgUrl(result.data.processedImageUrl); // The new image URL returned after background removal
        setBackgroundRemoved(true);
        toast.success("Background removed successfully");
      } else {
        toast.error(result.data.error || "Error removing background");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="page-wrapper">
      <Header />
      <div className="main-container">
        <div className="inner-banner thm-black-bg text-center">
          <div className="container">
            <h2 className="inner-banner__title">Sticker Printing</h2>
            <ul className="thm-breadcrumb">
              <li className="thm-breadcrumb__item">
                <Link to="/">Home</Link>
              </li>
              <li className="thm-breadcrumb__item">
                <Link to="/services">Services</Link>
              </li>
              <li className="thm-breadcrumb__item">
                <span>Sticker Printing</span>
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
                {images.map((image, i) => (
                  <SwiperSlide key={i}>
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
            <h2 className="main-heading">UV Ink Transfer Stickers</h2>
            <p className="fw-normal fs-5 mb-4">
              Unlock limitless creativity with our cutting-edge UV Ink Transfer
              Stickers.
            </p>
            <h3 className="fw-semibold fs-6">Cash on Delivery available</h3>
            <ul className="fw-medium fs-6 mb-3">
              <li>
                Designed for hassle-free, long-lasting application, our stickers
                adhere effortlessly to any flat or cylindrical surface.
              </li>
              <li>Impressive raised effect, with vibrant colours.</li>
              <li>Transfer your logos, photos, and text in 3 simple steps.</li>
              <li>
                For Steps to transfer Ink on your product, refer to guidelines
                in the overview section.
              </li>
              <li>
                For optimal results, upload files without a white or transparent
                background, or utilise the 'Remove Background' feature in the
                design studio.
              </li>
            </ul>

            <div className="dropdown-section mb-4">
              <div className="dropdown-Heading">
                <h4 className="d-inline fw-bold fs-5">Size</h4>
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
                  {data.size}
                </button>
                <div
                  className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                  aria-labelledby="dropdownMenu2"
                >
                  {sizes.map((item) => (
                    <button
                      className="dropdown-item"
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
            </div>

            <h4 className="fw-bold fs-5">Quantity</h4>
            <div className="list-group">
              {quantities.map((item) => (
                <div
                  key={item.quantity}
                  className={`${
                    data.quantity === item.quantity
                      ? "quality-list-container-activelink"
                      : "quality-list-container"
                  }`}
                  onClick={() => handleQuantityChange(item)}
                >
                  <div className="quality-list-first">
                    <span>{item.quantity}</span>
                    {item.isRecommended && (
                      <span className="quality-list-chip">Recommended</span>
                    )}
                    <div className="text-end">
                      <p className="mb-0 fw-medium">₹{item.price}</p>
                      <small className="quality-list-small">
                        ₹{Math.floor(item.price / item.quantity)} / unit
                      </small>
                    </div>
                  </div>
                  <small className="text-secondary">
                    {item.savings} savings
                  </small>
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
                  border: "1px solid #dfdfdf",
                  borderRadius: "20px",
                  padding: "30px 0",
                }}
              >
                <img
                  src={imgUrl}
                  style={{
                    height: "15rem",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </div>
            )}

            {imgUrl ? (
              <div
                className="flex"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {/* {!backgroundRemoved && ( */}
                <button
                  className={`secondary-btn w-auto mt-3 ${
                    backgroundRemoved && `opacity-20 cursor-none`
                  }`}
                  style={{
                    marginTop: "20px",
                    cursor: backgroundRemoved ? "not-allowed" : "pointer", // 'not-allowed' gives a disabled-like feel.
                    opacity: backgroundRemoved ? 0.5 : 1, // Reduce opacity when disabled.
                    pointerEvents: backgroundRemoved ? "none" : "auto", // Disable interaction when backgroundRemoved is true.
                  }}
                  onClick={() => !backgroundRemoved && removeBackground()}
                >
                  Click To Remove Background
                </button>

                {/* <VisitingCardEditor
                  image={imgUrl}
                  onImageSave={handleImageSave}
                  handleButtonClick={handleButtonClick}
                /> */}
                {/* <button className="secondary-btn w-auto  mt-3">
                  Edit Image
                </button> */}
              </div>
            ) : (
              !imgUrl && (
                <Link to={"/editsticker"} style={{ textDecoration: "none" }}>
                  <button className="secondary-btn w-auto mx-auto mt-3">
                    Edit Sticker
                  </button>
                </Link>
              )
              // !imgUrl && (
              //   <button
              //     style={{ marginTop: "20px" }}
              //     onClick={handleButtonClick}
              //   >
              //     Edit Image Here
              //   </button>
              // )
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
                  Make Your Brand Stand Out with Custom Ink Transfer Stickers.
                </h3>
                <p>
                  Looking for a versatile and eye-catching way to showcase your
                  brand? Look no further than our UV Ink Transfer Stickers.
                  These UV DTF stickers are perfect for both flat and
                  cylindrical surfaces, indoors or outdoors, and offer an
                  impressive, raised effect with vibrant colours that will make
                  your logo, photos, and text pop. With just three simple steps,
                  you can transfer your design onto any hard surface, giving
                  your products a professional and personalised touch. Don't
                  settle for ordinary stickers – upgrade to UV Ink Transfer
                  Stickers and make a lasting impression.
                </p>
                <h5>Steps to Transfer Ink on Your Product</h5>
                <ul>
                  <li>Step 1: Peel off the white backing paper.</li>
                  <li>
                    Step 2: Hold the transparent masking tape with your fingers
                    and place it on the desired location.
                  </li>
                  <li>
                    Step 3: Gently rub the surface from all sides for 30-40
                    seconds.
                  </li>
                  <li>
                    Step 4: Peel off the transparent plastic film slowly leaving
                    behind the ink on the surface.
                  </li>
                </ul>
                <p>
                  Note: UV Ink transfer stickers do not work on Paper products
                </p>
                <h5>Application guidelines:</h5>
                <p>
                  Suitable for flat and cylindrical surfaces that are hard in
                  nature.Ideal for indoor and outdoor use
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
                src="/images/service-stickerPrinting/services-details-image.png"
                alt="details"
                className=""
              />
            </div>
          </div>
        </div>
        <br />
        <div className="section-threeContainer">
          <h3>Related products</h3>
          <div className="relatedproduct-container">
            {relatedProducts.map((obj) => (
              <div key={obj.id} className="relatedproducd-one">
                <img src={obj.img} alt="related product" />
                <h4>{obj.title}</h4>
                <p>{obj.text}</p>
              </div>
            ))}
            {/* <div className="relatedproducd-one">
              <img
                src="/images/service-stickerPrinting/related-productone.png"
                alt="related product"
              />
              <h4>Sheet Stickers</h4>
              <p>24 starting at ₹160.00</p>
            </div>
            <div className="relatedproducd-one">
              <img
                src="/images/service-stickerPrinting/related-productone.png"
                alt="related product"
              />
              <h4>Sheet Stickers</h4>
              <p>24 starting at ₹160.00</p>
            </div>
            <div className="relatedproducd-one">
              <img
                src="/images/service-stickerPrinting/related-productone.png"
                alt="related product"
              />
              <h4>Sheet Stickers</h4>
              <p>24 starting at ₹160.00</p>
            </div>
            <div className="relatedproducd-one">
              <img
                src="/images/service-stickerPrinting/related-productone.png"
                alt="related product"
              />
              <h4>Sheet Stickers</h4>
              <p>24 starting at ₹160.00</p>
            </div>
            <div className="relatedproducd-one">
              <img
                src="/images/service-stickerPrinting/related-productone.png"
                alt="related product"
              />
              <h4>Sheet Stickers</h4>
              <p>24 starting at ₹160.00</p>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StickerPrinting;
