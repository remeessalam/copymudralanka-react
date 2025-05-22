import { useContext, useEffect, useState } from "react";
import { SpinnerContext } from "./SpinnerContext";
import { addToCart, getTemplates } from "../apiCalls";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

const DesingPage = () => {
  const { loading, setLoading } = useContext(SpinnerContext);
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = new FormData();
  const filterTemplates = (templates) => {
    return templates.filter((template) => {
      const nameStartsWith =
        location.pathname === "/visiting-card-designs" ? "template" : "sticker";
      return template.name.startsWith(nameStartsWith);
    });
  };
  const fetchTemplates = async () => {
    try {
      setLoading(true); // Set loading state
      const response = await getTemplates();
      console.log(response, "asdfasdfasdfs");
      const filteredTemplates = filterTemplates(response.data.templates || []);

      setTemplates(filteredTemplates || []);
      // console.log(templatesWithData);
      setLoading(false); // Reset loading state
    } catch (err) {
      console.error("Error fetching templates:", err);
      setLoading(false);
      toast.error("Failed to load templates.");
    }
  };

  useEffect(() => {
    // Fetch templates on initial render
    fetchTemplates();
  }, []);
  console.log(templates, "asdfasdgfasdfasdf");

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
  const addItemToCart = async (base64Image) => {
    // !loading && setLoading(true);

    // localStorage.setItem("selectedImage", base64Image);
    const quantity = localStorage.getItem("quantity");
    const amount = localStorage.getItem("amount");

    if (!quantity) {
      toast("Please select a  quantity", { id: "quantity" });
      return;
    }
    if (!base64Image) {
      toast("Please select a design", { id: "image" });
      return;
    }
    try {
      // const savedImage = localStorage.getItem("selectedImage");
      let file;
      // if (base64Image) {
      //   file = base64ToFile(base64Image, "design.png");
      // }
      console.log(file, base64Image, "asdfasdfasdfasdf");
      const compressedFile = await compressImage(file);
      console.log(file, compressedFile, base64Image, "asdfklasjdflaksdjfklsdf");
      formData.append("imageFile", compressedFile || base64Image);
      formData.append("quantity", quantity);
      formData.append("category", "VISITING_CARD");
      formData.append("userId", localStorage.getItem("userId") || "");
      formData.append("amount", amount);

      const res = await addToCart(formData);
      console.log(res, "htiasdfikasdjf");
      if (res.data.status === false && res.data.error.code === "413") {
        return toast.error("The image file is too large.");
      }
      if (res.data.status) {
        toast.success("Item added to cart");
        localStorage.removeItem("selectedImage");
        // localStorage.removeItem("EditedImage");
        localStorage.removeItem("quantity");
        localStorage.removeItem("amount");
      } else {
        toast.error(res.data.error);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      // handleCustomButtonClick();
    }
  };

  const handleaddToCart = async (base64Image) => {
    try {
      setLoading(true);

      const scalingFactor = 300 / 72; // Scaling factor for 300 DPI

      let templateimages = base64Image;
      console.log(base64Image, "asdflkasjdf");

      if (base64Image) {
        addItemToCart(base64Image);
      }
      return;
    } catch (error) {
      console.error("Error exporting high-res image:", error);
      toast.error("Failed to export high-resolution image.");
      setLoading(false);
    }
  };

  return (
    <div className="designcontainer">
      <h1 className="mt-4">
        {location.pathname === "/visiting-card-designs"
          ? "Standard Visting Cards"
          : "Standard Sticker"}
      </h1>
      <br />
      <Link className="secondary-btn mt-4" to={"/editor"}>
        Create new{" "}
      </Link>
      <div className="designgrid mt-4">
        {templates.map((obj) => (
          <div key={obj.id} className="designcard">
            <div
              className="designimage-preview"
              style={{
                backgroundImage: obj.base64Image
                  ? `url(data:image/png;base64,${obj.base64Image})`
                  : "",
              }}
            />
            <div className="desingbutton-container">
              <button
                className="secondary-btn"
                onClick={() =>
                  navigate(
                    location.pathname === "/visiting-card-designs"
                      ? `/editvisiting-card/${obj.fileId}`
                      : `/editsticker/${obj.fileId}`
                  )
                }
              >
                Edit
              </button>{" "}
              {/* <button
                onClick={() => handleaddToCart(obj.base64Image)}
                className="secondary-btn"
              >
                Add To Cart
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesingPage;
