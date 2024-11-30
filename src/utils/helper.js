// convert base64 to file
export const convertBase64intoFile = (base64) => {
  // Extract the Base64 data (removing the prefix)
  const base64Data = base64.split(",")[1];

  // Convert Base64 to binary data
  const byteCharacters = atob(base64Data);
  const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);

  // Create a Blob
  const blob = new Blob([byteArray], { type: "image/png" });
  return blob;
};
