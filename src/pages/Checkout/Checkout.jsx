import React, { useContext, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShippingAddress from "./components/ShippingAddress";
import CartItems from "./components/CartItems";
import { Link } from "react-router-dom";
import { SpinnerContext } from "../../components/SpinnerContext";
import { getCartItems } from "../../apiCalls";
import toast from "react-hot-toast";
import "./Checkout.css";

const Checkout = () => {
  const { setLoading, loading } = useContext(SpinnerContext);
  const [cartItems, setCartItems] = useState([]);

  // get cart items
  const getCartData = async () => {
    try {
      setLoading(true);
      const res = await getCartItems();
      if (res.data.status) {
        setCartItems(res.data.cartItems);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getCartData();
    }
  }, []);
  return (
    <div class="page-wrapper">
      <Header />
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="grid-container">
            <div className="grid1">
              <ShippingAddress
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            </div>
            <div className="grid2">
              <CartItems cartItems={cartItems} />
            </div>
          </div>
        ) : (
          !loading && (
            <div className="empty-cart-container">
              <h1 style={{ textAlign: "center" }}>Your Cart is Empty</h1>
              <div className="btn-div button-div">
                <Link
                  to="/"
                  style={{ width: "fit-content", marginInline: "auto" }}
                  type="submit"
                  className="banner-btn"
                >
                  Home Page
                </Link>
              </div>
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
