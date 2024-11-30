import React from "react";
import { Link } from "react-router-dom";
import "./CartItems.css";

const CartItems = ({ cartItems }) => {
  return (
    <div className="cart-items-container">
      <h2 className="cart-items-title block-title__tag-line">Order Summary</h2>
      <div className="cart-items-summary">
        {cartItems.map((item, idx) => (
          <div
            key={item.imageFile}
            className={`cart-item ${
              idx !== cartItems.length - 1 ? "cart-item-with-border" : ""
            }`}
          >
            <div className="cart-item-grid">
              <Link to={`/product-details`}>
                <img
                  src={item.imageFile}
                  className="cart-item-image"
                  alt={item.category}
                />
              </Link>
              <div className="cart-item-details">
                <p className="cart-item-title">
                  {item.category.split("_").join(" ")}
                </p>
                <p className="cart-item-price">
                  ₹{item.amount} {item.quantity && `X ${item.quantity}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary-details">
        <div className="cart-summary-row">
          <p className="cart-summary-label">Subtotal</p>
          <p className="cart-summary-value">
            ₹{cartItems.reduce((a, b) => a + b.amount, 0)}
          </p>
        </div>
        <div className="cart-summary-row">
          <p className="cart-summary-label">Shipping</p>
          <p className="cart-summary-value">---</p>
        </div>
        <div className="cart-summary-total">
          <p className="cart-summary-total-label">Total</p>
          <p className="cart-summary-total-value">
            ₹{cartItems.reduce((a, b) => a + b.amount, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
