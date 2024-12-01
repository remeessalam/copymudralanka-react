// // ImageContext.js
// import React, { createContext, useState, useContext } from "react";

// // Create the context for image data
// const ImageContext = createContext();

// // Create the provider component
// export const ImageProvider = ({ children }) => {
//   const [image, setImage] = useState(null); // Stores the selected image

//   // Method to update the image
//   const addImage = (newImage) => {
//     setImage(newImage);
//   };

//   // Method to remove the image
//   const removeImage = () => {
//     setImage(null);
//   };

//   return (
//     <ImageContext.Provider value={{ image, addImage, removeImage }}>
//       {children}
//     </ImageContext.Provider>
//   );
// };

// // Custom hook to use the image context
// export const useImageContext = () => {
//   return useContext(ImageContext);
// };
