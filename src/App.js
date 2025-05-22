import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SpinnerContextProvider from "./components/SpinnerContext";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { createContext, lazy, Suspense, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AboutUs from "./pages/AboutUs";
import OurServices from "./pages/OurServices";
import ContactUs from "./pages/ContactUs";
import { LoadingSpinner } from "./components/LoadingSpinner";
import ScrollToTopOnPageChange from "./components/ScrollToTopOnPageChange";
import StickerPrinting from "./pages/StickerPrinting/StickerPrinting";
import PvcIdCard from "./pages/PvcIdCard/PvcIdCard";
import MobileCase from "./pages/MobileCase/MobileCase";
import VisitingCard from "./pages/VisitingCard/VisitingCard";
import BillBook from "./pages/BillBook/BillBook";
import toast, { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import { addUser } from "./apiCalls";
import { NewEditor } from "./pages/VisitingCard/NewEditor";
import DesingPage from "./components/DesingPage";

const Home = lazy(() => import("./pages/Home/Home"));

AOS.init({
  once: true,
  duration: 500,
  offset: -50,
});

function App() {
  const pathname = window.location.pathname;
  const authChecked = useRef(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!authChecked.current && !userId) {
      addUserIfNotExist();
      authChecked.current = true;
    }
  }, [pathname]);

  const addUserIfNotExist = async () => {
    try {
      const res = await addUser();
      if (res.data.status) {
        localStorage.setItem("userId", res.data.user._id);
      } else {
        toast.error(res.data.error);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <SpinnerContextProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Router>
          <ScrollToTopButton />
          <ScrollToTopOnPageChange />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#17354f",
                color: "#fff",
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<OurServices />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/editvisiting-card/:fileId" element={<NewEditor />} />
            <Route path="/editsticker/:fileId" element={<NewEditor />} />
            <Route path="/visiting-card-designs" element={<DesingPage />} />
            <Route path="/sticker-designs" element={<DesingPage />} />

            {/* Service details pages */}
            <Route
              path="/sticker-printing/:productId?"
              element={<StickerPrinting />}
            />
            <Route path="/pvcidcard/:productId?" element={<PvcIdCard />} />
            <Route path="/mobilecase/:productId?" element={<MobileCase />} />
            <Route
              path="/visitingcard/:productId?"
              element={<VisitingCard />}
            />
            <Route path="/billbook/:productId?" element={<BillBook />} />
          </Routes>
        </Router>
      </Suspense>
    </SpinnerContextProvider>
  );
}

export default App;
