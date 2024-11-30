import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import pincodes from "indian-pincodes";
import { State, City } from "country-state-city";
import toast from "react-hot-toast";
import "./ShippingAddress.css";
import { SpinnerContext } from "../../../components/SpinnerContext";
import { sendEmailLink } from "../../../constant";

const ShippingAddress = ({ cartItems, setCartItems }) => {
  const [states, setStates] = useState(State.getStatesOfCountry("IN"));
  const [cities, setCities] = useState(City.getCitiesOfState("IN", "KL"));
  const { setLoading } = useContext(SpinnerContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      mobile: "",
      pincode: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
    },
  });

  const createBodyData = () => {
    const body = cartItems
      .map((item) => {
        let data = `Category : ${item.category.split("_").join(" ")}\n\n`;
        data += `Image : ${item.imageFile}\n\n`;
        data += item.size ? "Size : " + item.size + "\n\n" : "";
        data += item.quantity ? "Quantity : " + item.quantity + "\n\n" : "";
        data += item.brand ? "Brand : " + item.brand + "\n\n" : "";
        data += `Total Price : ₹${item.amount}\n\n`;
        return data;
      })
      .join("\n");
    return body;
  };

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    const details = createBodyData();
    let body = "Customer Name : " + data.name + "\n\n";
    body += "Contact Number : " + data.mobile + "\n\n";
    body += "Pincode : " + data.pincode + "\n\n";
    body += "Address : " + data.address + "\n\n";
    body += "Landmark : " + data.landmark + "\n\n";
    body += "City : " + data.city + "\n\n";
    body += "State : " + data.state + "\n\n\n\n";
    body += "Orders Below 👇\n\n\n";

    const bodyData = body + details;
    formData.append("body", bodyData);

    try {
      setLoading(true);
      const response = await fetch(sendEmailLink, {
        method: "POST",
        body: formData,
      });
      // const response = { ok: true };
      if (response.ok) {
        toast.success("Order placed successfully");
        localStorage.removeItem("userId");
        setCartItems([]);
        reset();
      } else {
        toast.error("Error placing order");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error placing order " + error.message, { id: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="shipping-form">
      <h2 className="shipping-form-title block-title__tag-line">
        Shipping Address
      </h2>

      <div className="shipping-form-grid">
        <div className="shipping-form-input-container">
          <label className="shipping-form-label">
            Full name (First and Last name)
          </label>
          <input
            type="text"
            className="shipping-form-input"
            {...register("name", {
              required: "Name is required",
              validate: (value) => {
                if (value.trim() === "") {
                  return "Name is required";
                } else {
                  return true;
                }
              },
            })}
          />
          <small className="shipping-form-error">{errors.name?.message}</small>
        </div>

        <div className="shipping-form-input-container">
          <label className="shipping-form-label">Mobile number</label>
          <input
            type="tel"
            className="shipping-form-input"
            {...register("mobile", {
              required: "Mobile is required",
              pattern: {
                value: /^[1-9]\d{9}$/i,
                message: "Please enter a valid mobile number",
              },
            })}
          />
          <small className="shipping-form-error">
            {errors.mobile?.message}
          </small>
        </div>
      </div>

      <div className="shipping-form-input-container">
        <label className="shipping-form-label">Pincode</label>
        <input
          type="text"
          className="shipping-form-input"
          placeholder="6 digit [0-9] pincode"
          maxLength={6}
          minLength={6}
          {...register("pincode", {
            required: "Pincode is required",
            pattern: {
              value: /^[0-9]{6}$/,
              message: "Please enter a valid ZIP or postal code",
            },
            validate: (val) => {
              const details = pincodes.getPincodeDetails(Number(val));
              if (details) {
                setValue("city", details.division);
                setValue("state", details.state);
                setError("city", null);
                setError("state", null);
                return true;
              } else {
                return "Please enter a valid ZIP or postal code";
              }
            },
          })}
        />
        <small className="shipping-form-error">{errors.pincode?.message}</small>
      </div>

      <div className="shipping-form-input-container">
        <label className="shipping-form-label">Address</label>
        <input
          type="text"
          className="shipping-form-input"
          {...register("address", {
            required: "Address is required",
            validate: (value) => {
              if (value.trim() === "") {
                return "Address is required";
              } else {
                return true;
              }
            },
          })}
        />
        <small className="shipping-form-error">{errors.address?.message}</small>
      </div>

      <div className="shipping-form-input-container">
        <label className="shipping-form-label">Landmark</label>
        <input
          type="text"
          className="shipping-form-input"
          {...register("landmark", {
            required: "Landmark is required",
            validate: (value) => {
              if (value.trim() === "") {
                return "Landmark is required";
              } else {
                return true;
              }
            },
          })}
        />
        <small className="shipping-form-error">
          {errors.landmark?.message}
        </small>
      </div>

      <div className="shipping-form-grid">
        <div className="shipping-form-input-container">
          <label className="shipping-form-label">Town/City</label>
          <input
            type="text"
            className="shipping-form-input"
            {...register("city", {
              required: "City is required",
            })}
          />
          <small className="shipping-form-error">{errors.city?.message}</small>
        </div>

        <div className="shipping-form-input-container">
          <label className="shipping-form-label">State</label>
          <select
            className="shipping-form-select"
            {...register("state", { required: "State is required" })}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          <small className="shipping-form-error">{errors.state?.message}</small>
        </div>
      </div>

      <div className="btn-div">
        <button type="submit" className="banner-btn">
          Proceed to Checkout
        </button>
      </div>
    </form>
  );
};

export default ShippingAddress;
