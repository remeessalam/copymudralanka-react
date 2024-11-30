// send email link
export const sendEmailLink =
  // "http://localhost:5000/api/send-email";
  "https://mudralanka-sendmail.vercel.app/api/send-email";

// Categories
export const categories = [
  { page: "STICKER_PRINTING", path: "/sticker-printing" },
  { page: "PVC_ID_CARD", path: "/pvcidcard" },
  { page: "VISITING_CARD", path: "/visitingcard" },
  { page: "MOBILE_CASE", path: "/mobilecase" },
  { page: "BILLBOOK", path: "/billbook" },
];

// header links
export const headerLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About Us",
    path: "/about",
  },
  {
    title: "Our Services",
    path: "/services",
  },
  {
    title: "My Cart",
    path: "/cart",
  },
  {
    title: "Contact Us",
    path: "/contact",
  },
];

// services
export const services = [
  {
    image: require("./assets/images/icons/wall-sticker-1-1.jpg"),
    title: "Sticker Printing",
    path: "/sticker-printing",
  },
  {
    image: require("./assets/images/icons/id-card-1-1.jpg"),
    title: "PVC ID Card",
    path: "/pvcidcard",
  },
  {
    image: require("./assets/images/icons/mobile-case-1-1.jpg"),
    title: "Mobile Case Printing",
    path: "/mobilecase",
  },
  {
    image: require("./assets/images/icons/visiting-card-1-1.jpg"),
    title: "Visiting Card",
    path: "/visitingcard",
  },
  {
    image: require("./assets/images/icons/accounting-book-1-1.jpg"),
    title: "Billbook",
    path: "/billbook",
  },
];

export const socialMediaLinks = {
  whatsapp:
    "https://api.whatsapp.com/send/?phone=917799372747&text&type=phone_number&app_absent=0",
  youtube: "https://www.youtube.com/@mudralanka",
  instagram:
    "https://www.instagram.com/printshop.mudralanka/profilecard/?igsh=d2hvaTk2a2ZpYmV5",
};

export const relatedProducts = [
  {
    id: 1,
    img: "/images/service-stickerPrinting/related-productone.png",
    title: "Sheet Stickers",
    text: "24 starting at ₹160.00",
  },
  {
    id: 2,
    img: "/images/service-stickerPrinting/related-producttwo.png",
    title: "Product & Packaging Labels",
    text: "24 starting at ₹160.00",
  },
  {
    id: 3,
    img: "/images/service-stickerPrinting/related-productthree.png",
    title: "Name Tags",
    text: "10 starting at ₹140.00",
  },
  {
    id: 4,
    img: "/images/service-stickerPrinting/related-productfour.png",
    title: "Custom Car Stickers",
    text: "5 starting at ₹240.00",
  },
  {
    id: 5,
    img: "/images/service-stickerPrinting/related-productfive.png",
    title: "Custom Shape Stickers",
    text: "10 starting at ₹190.00",
  },
  {
    id: 6,
    img: "/images/service-stickerPrinting/related-productsix.png",
    title: "Sticker Singles",
    text: "50 starting at ₹245.00",
  },
];
