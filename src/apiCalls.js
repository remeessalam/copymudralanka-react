import axios from "axios";
export const convertUrlIntoFile = () => {};

// ;
// const baseUrl ="https://photoprinting-backend.vercel.app";
//NEW BACKEND LINK ADDED
// const baseUrl = "https://photoprinting-backend-five.vercel.app/";
const baseUrl = "https://photoprinting-backend-khaki.vercel.app";
// const baseUrl = "http://localhost:8080";

export const apiInstance = axios.create({
  baseURL: baseUrl,
  validateStatus: (status) => status < 500,
});

// add user
export const addUser = () => {
  return apiInstance.post("/login");
};

// get cart items
export const getCartItems = () => {
  const id = localStorage.getItem("userId");
  return apiInstance.get("/cart/get/" + id);
};

// add to cart
export const addToCart = (data) => {
  return apiInstance.post("/cart/create", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// get product by id
export const getCartItemById = (id) => {
  return apiInstance.get("/cart/cartitembyid/" + id);
};

// update cart item
export const updateCartItem = (id, data) => {
  return apiInstance.put("/cart/update/" + id, data);
};

// delete cart item
export const deleteCartItem = (id) => {
  return apiInstance.delete("/cart/delete/" + id);
};

export const removeBackgrounds = (data) => {
  return apiInstance.post("/cart/removebackground/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// get templates
export const getTemplates = () => {
  return apiInstance.get("/templates/get-templates");
};

// add a template
export const addTemplate = (formData) => {
  return apiInstance.post("/templates/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getTemplate = (template) => {
  return apiInstance.get(`/templates/find/${template.fileId}`, {
    responseType: "blob",
  });
};

// delete all templates
// export const deleteAllTemplates = () => {
//   return apiInstance.delete("/templates");
// };

// const sendMail = async () => {
//     console.log("API Called!!");
//     if (data.size === "Select Size") {
//       return toast("Please select a size and quantity", { id: "size" });
//     }
//     if (data.quantity === "") {
//       return toast("Please select a size and quantity", { id: "quantity" });
//     }
//     const { size, quantity } = data;
//     let body = `
//       Size: ${size}\n
//       Quantity: ${quantity}\n\n`;
//     formData.append("subject", "New Order - Sticker Printing - Mudralanka");
//     formData.append("body", body);

//     try {
//       setLoading(true);
//       const response = await fetch(sendEmailLink, {
//         method: "POST",
//         body: formData,
//       });
//       // const response = { ok: true };
//       if (response.ok) {
//         toast.success("Order placed successfully");
//         setData({ size: "Select Size", quantity: "", file: "" });
//       } else {
//         toast.error("Error placing order");
//       }
//     } catch (error) {
//       toast.error("Error placing order " + error.message, { id: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };
