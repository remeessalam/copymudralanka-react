import React, { useContext, useState } from "react";
import "./Cart.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import { deleteCartItem, getCartItems } from "../../apiCalls";
import { SpinnerContext } from "../../components/SpinnerContext";
import { categories } from "../../constant";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { setLoading } = useContext(SpinnerContext);

  const navigate = useNavigate();

  const deleteFromCart = async (item) => {
    try {
      const res = await deleteCartItem(item._id);
      if (res.data.status) {
        toast.success("Item removed from cart");
        const updatedData = cartItems.filter(
          (cartItem) => cartItem._id !== item._id
        );
        setCartItems(updatedData);
      } else {
        toast.error(res.data.error);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const totalPrice =
    cartItems.length > 0
      ? cartItems.reduce((acc, item) => acc + item.amount, 0)
      : 0;

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

  // navigate to product details page
  const navigateToDetails = (item) => {
    const redirectPage = categories.find(
      (category) => category.page === item.category
    );
    console.log(`${redirectPage.path}/${item._id}`);
    navigate(`${redirectPage.path}/${item._id}`);
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="main-container">
        <div className="inner-banner thm-black-bg text-center">
          <div className="container">
            <h2 className="inner-banner__title">My Cart</h2>
            <ul className="thm-breadcrumb">
              <li className="thm-breadcrumb__item">
                <Link to="/">Home</Link>
              </li>
              <li className="thm-breadcrumb__item">
                <span>My Cart</span>
              </li>
            </ul>
          </div>
        </div>
        <div data-aos="fade-up" className="container">
          {/* <h1>My Cart</h1> */}
          <div className="">
            {cartItems.length === 0 ? (
              <div className="cart-emptyCart-container w-full flex flex-col justify-center items-center h-[90vh]">
                <h3 className="heading-2 uppercase text-center mb-3">
                  YOUR BAG IS EMPTY
                </h3>

                <Link
                  to="/services"
                  className="cart-btn cart-cartitem-buttons-two text-center primary-btn min-w-[18rem] mt-20"
                >
                  Services
                </Link>
              </div>
            ) : (
              <div className="my-10 cart-container">
                <h2 className=" cart-cartitems-heading">SHOPPING CART</h2>
                <div className="cart-cartitems-container grid gap-6 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {cartItems.map((item) => (
                    <div key={item.imageFile} className="cart-cartitem">
                      <div
                        onClick={() => navigateToDetails(item)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={item.imageFile}
                          alt={item.category}
                        />
                        <h4 className="text-dark">
                          {item.category.split("_").join(" ")}
                        </h4>
                      </div>
                      <h6 className="">Price : ₹ {item.amount}</h6>
                      {item.quantity && (
                        <h6 className="">Quantity : {item.quantity}</h6>
                      )}
                      {item.size && <h6 className="">Size : {item.size}</h6>}
                      {item.brand && <h6 className="">Brand : {item.brand}</h6>}
                      <div
                        className="p-2 rounded w-100 border d-flex justify-content-center bg-danger text-white"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteFromCart(item)}
                      >
                        <CiTrash size={25} />
                      </div>
                      {/* <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenu2"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          style={{
                            background: "white",
                            width: "100%",
                          }}
                        >
                          {data.size}
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenu2"
                        >
                          {sizes.map((item) => (
                            <button
                              className="dropdown-item"
                              type="button"
                              value={item}
                              key={item}
                              onClick={() =>
                                setData((prev) => ({ ...prev, size: item }))
                              }
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div> */}
                      {/* <div className="cart-cartitem-count flex gap-5 border w-fit px-3 py-1 rounded-full select-none">
                        {item.quantity === 1 ? (
                          <CiTrash
                            className="cart-cartitem-count-buttons"
                            onClick={() => decrement(item.id)}
                          />
                        ) : (
                          <FiMinus
                            className="cart-cartitem-count-buttons "
                            onClick={() => decrement(item.id)}
                          />
                        )}
                        <p className="cart-cartitem-count-p ">
                          {item.quantity}
                        </p>
                        <GoPlus
                          className="cart-cartitem-count-buttons"
                          onClick={() => increment(item.id)}
                        />
                      </div> */}
                    </div>
                  ))}
                </div>

                <div className="cart-cartitem-subtotal-container border-t mt-10 py-5">
                  <div className="cart-cartitem-subtotal-area flex justify-end">
                    <h1 className="text-xl text-end pl-3 min-w-[260px]">
                      Subtotal :
                      {/* (
                      <span className="w-4">
                        {cartItems.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}{" "}
                        item
                        {cartItems.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        ) > 1
                          ? "s"
                          : ""}
                      </span>
                      ):{" "} */}{" "}
                      <span className="font-bold inline">₹ {totalPrice}</span>
                    </h1>
                  </div>

                  <div className="cart-cartitem-buttons-container flex justify-end mt-10 gap-5">
                    <button
                      className="cart-btn cart-cartitem-buttons-one text-white bg-black hover:bg-black/70 uppercase"
                      onClick={emptyCart}
                    >
                      Clear Cart
                    </button>
                    <button
                      className="cart-btn cart-cartitem-buttons-two"
                      onClick={() => navigate("/checkout")}
                    >
                      To Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
