import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  createDemoApp,
  PolotnoContainer,
  SidePanelWrap,
  WorkspaceWrap,
} from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel, DEFAULT_SECTIONS } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "@blueprintjs/core/lib/css/blueprint.css";
import { saveAs } from "file-saver";
import { SpinnerContext } from "../../components/SpinnerContext";
import { addTemplate, getTemplates, getTemplate } from "../../apiCalls";
import "./components/newEditor.css";
import { FaFileAlt } from "react-icons/fa";
import { removeBackgrounds } from "../../apiCalls";
import { observer } from "mobx-react-lite";
import { pxToUnitRounded } from "polotno/utils/unit";

// Initialize the Polotno app
const { store } = createDemoApp({
  container: document.getElementById("root"),
  key: "QTbtE3xruoaFYCgHfrd5", // Replace with your valid key.
  showCredit: true,
});

// Set the unit and DPI
store.setUnit({
  unit: "mm", // Use millimeters as the unit
  dpi: 300, // Set DPI to 300
});

const customTemplatesSection = {
  name: "customTemplates",
  Tab: (props) => (
    <div
      {...props}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FaFileAlt style={{ marginBottom: 8, fontSize: "30px", marginTop: 8 }} />{" "}
      {/* Increased icon size */}
      <div>Templates</div>
    </div>
  ),
  Panel: ({ templates, onTemplateClick }) => {
    if (!templates.length) {
      return <div style={{ padding: 20 }}>No templates available.</div>;
    }
    return (
      <div
        style={{
          padding: 20,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Two columns in the grid
            gap: "16px", // Spacing between grid items
            gridAutoRows: "minmax(250px, auto)", // Allow grid items to have different heights
            overflowY: "auto", // Adds vertical scrollbar if content overflows
            flexGrow: 1, // Ensures the grid takes up available space
            paddingRight: "8px", // To avoid cutting off scrollbar
            maxHeight: "calc(100vh - 40px)", // Subtracting padding for the full height adjustment
          }}
        >
          {templates.map((template, index) => (
            <div
              key={template.id || index}
              style={{
                border: "1px solid #ddd",
                borderRadius: 4,
                padding: 10,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
                boxSizing: "border-box",
                height: "auto", // Remove fixed height to allow content to adjust dynamically
              }}
              onClick={() => onTemplateClick(template)} // Load template on click
            >
              {/* Template Image Preview */}
              <div
                style={{
                  width: "100%",
                  height: "200px", // Fixed height for the image preview container
                  backgroundColor: "#e0e0e0",
                  borderRadius: 4,
                  backgroundImage: template.base64Image
                    ? `url(data:image/png;base64,${template.base64Image})` // Use base64 data for image preview
                    : "",
                  backgroundSize: "cover", // Ensures the image covers the entire container
                  backgroundPosition: "center", // Centers the image
                  objectFit: "cover", // Ensures the image fills the container without distortion
                }}
              >
                {/* This will render the preview if base64Template is available */}
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: 8,
                }}
              >
                {template.name || `Template ${index + 1}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// Custom UI component to display dimensions in millimeters
const CustomUnitDisplay = observer(({ store }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      const selectedElement = store.selectedElements[0];
      if (selectedElement) {
        // Convert width and height from pixels to millimeters
        const widthInMm = pxToUnitRounded({
          px: selectedElement.width,
          unit: "mm",
          precision: 2,
          dpi: 300,
        });
        const heightInMm = pxToUnitRounded({
          px: selectedElement.height,
          unit: "mm",
          precision: 2,
          dpi: 300,
        });
        setWidth(widthInMm);
        setHeight(heightInMm);
      }
    };

    // Update dimensions when the store changes
    updateDimensions();
    store.on("change", updateDimensions);

    return () => {
      // store.off("change", updateDimensions);
    };
  }, [store]);

  return <div></div>;
});

export const NewEditor = () => {
  const modalRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading } = useContext(SpinnerContext);
  const [templates, setTemplates] = useState([]);
  const [backgroundRemoved, setBackgroundRemoved] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [openEditorOption, setOpenEditorOption] = useState(false);
  const fetchTemplates = async () => {
    try {
      setLoading(true); // Set loading state
      const response = await getTemplates();
      console.log(response, "asdfasdfasdfs");
      // Process templates without generating previews
      // const templatesWithData = await Promise.all(
      //   response.data.templates.map(async (template) => {
      //     const templateResponse = await getTemplate(template);
      //     const reader = new FileReader();
      //     const templateBlob = new Blob([templateResponse.data], {
      //       type: "application/json",
      //     });

      //     return new Promise((resolve) => {
      //       reader.onload = (e) => {
      //         try {
      //           // Parse and assign template JSON
      //           const templateData = JSON.parse(e.target.result);
      //           template.jsonData = templateData; // Add parsed JSON to the template objec
      //           resolve(template);
      //         } catch (parseError) {
      //           console.error("Failed to parse template:", parseError);
      //           resolve(template); // Still resolve if there's an error
      //         }
      //       };
      //       reader.readAsText(templateBlob);
      //     });
      //   })
      // );

      // Update state with templates
      // setTemplates(templatesWithData || []);
      setTemplates(response.data.templates || []);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenEditorOption(false);
      }
    }

    if (openEditorOption) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openEditorOption]);

  const handleCustomButtonClick = () => {
    location.pathname === "/editvisiting-card"
      ? navigate("/visitingcard")
      : navigate("/sticker-printing");
  };

  const handleTemplateExport = () => {
    const templateJSON = store.toJSON(); // Get the current state as JSON
    const blob = new Blob([JSON.stringify(templateJSON, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "template.json"); // Use FileSaver.js to trigger download
    toast.success("Template exported successfully!");
  };

  const handleTemplateImport = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0]; // Get the selected file

    if (!file) {
      toast.error("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        // Step 1: Parse the JSON file content
        const templateData = JSON.parse(e.target.result);

        // Step 2: Load the JSON into Polotno canvas
        store.loadJSON(templateData);

        // Step 3: Generate a base64 image preview
        const maxWidth = 200;
        const scale = maxWidth / store.width;
        const base64Image = await store.toDataURL({ pixelRatio: scale });

        // Step 4: Append file, name, and base64 image to FormData
        const name = file.name.replace(".json", ""); // Extract name from file
        formData.append("file", file);
        formData.append("name", name);
        formData.append("base64_image", base64Image.split(",")[1]); // Add base64 content

        // Step 5: Upload the template to the server
        await addTemplate(formData);

        toast.success("Template uploaded successfully!");
        fetchTemplates(); // Refresh the templates list
      } catch (err) {
        console.error("Error processing template file:", err);
        toast.error("Failed to upload template.");
      }
    };

    reader.readAsText(file); // Read the file content
  };

  const handleTemplateClick = async (template) => {
    try {
      console.log("Clicked Template:", template);
      console.log("Attempting to fetch template with FileID:", template.fileId);
      setLoading(true);
      const response = await getTemplate(template);

      console.log(response);

      // Create a FileReader to read the blob
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          // Parse the file content
          const templateData = JSON.parse(e.target.result);

          // Load into Polotno store
          store.loadJSON(templateData);
        } catch (parseError) {
          console.error("Failed to parse template:", parseError);
          toast.error("Invalid template format");
        }
      };

      reader.readAsText(response.data);
      // Rest of your existing logic for processing the template
    } catch (error) {
      console.error("Template fetch error:", error);
      toast.error("Failed to load template");
    } finally {
      setLoading(false);
      toggleCollapse();
    }
  };
  // if (sidePanel) {
  //   sidePanel.classList.add("collapsed");
  // }
  // const sidePanel = document.querySelector(
  //   ".go2955394242.bp5-navbar.polotno-side-panel"
  // );
  function toggleCollapse() {
    const panelContainer = document.querySelector(
      ".go3960841851.bp5-navbar.polotno-panel-container"
    );

    if (window.innerWidth <= 768 && panelContainer) {
      panelContainer.style.display = "none";
      panelContainer.style.overflowY = "hidden";
    }
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("imageFile", file);

      const result = await removeBackgrounds(formData); // Call your API to remove background.

      if (result.data.status) {
        const processedImageUrl = result.data.processedImageUrl;

        // Create an invisible download link.
        setImageUrl(processedImageUrl);
        // const link = document.createElement("a");
        // link.href = processedImageUrl;
        // link.download = "processed-image.png"; // Set the file name for the downloaded image.

        // Append the link to the document body, trigger the download, then remove the link.
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);

        setBackgroundRemoved(true);
        toast.success("Background removed successfully and image downloaded");
      } else {
        toast.error(result.data.error || "Error removing background");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while removing background");
    } finally {
      setLoading(false);
    }
  };

  const removeBackground = () => {
    if (backgroundRemoved) return;

    // Trigger file input programmatically.
    document.getElementById("fileInput").click();
  };
  // Function to export high-resolution image (300 DPI)
  const exportHighResImage = async () => {
    try {
      const scalingFactor = 300 / 72; // Scaling factor for 300 DPI
      const base64Image = await store.toDataURL({ pixelRatio: scalingFactor });
      console.log(base64Image, "asdflkasjdf");
      // Trigger download
      localStorage.setItem("selectedImage", base64Image);
      localStorage.setItem("EditedImage", base64Image);
      handleCustomButtonClick();
      return;
      // const link = document.createElement("a");
      // link.href = base64Image;
      // link.download = "high-res-image.png"; // Set the file name
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      // toast.success("High-resolution image exported successfully!");
    } catch (error) {
      console.error("Error exporting high-res image:", error);
      toast.error("Failed to export high-resolution image.");
    }
  };
  return (
    <>
      <PolotnoContainer style={{ width: "100vw", height: "100vh" }}>
        <SidePanelWrap>
          <SidePanel
            store={store}
            sections={[
              {
                ...customTemplatesSection,
                Panel: () => (
                  <customTemplatesSection.Panel
                    templates={templates}
                    onTemplateClick={handleTemplateClick}
                  />
                ),
              },
              ...DEFAULT_SECTIONS.filter(
                (section) => section.name !== "templates"
              ),
            ]}
          />
        </SidePanelWrap>
        <WorkspaceWrap>
          <Toolbar store={store} />
          {/* downloadButtonEnabled */}
          <Workspace store={store} />
          <ZoomButtons store={store} />
        </WorkspaceWrap>

        {/* Custom UI for displaying dimensions */}
        <CustomUnitDisplay store={store} />

        {/* Button to export high-resolution image */}
        <div className="cover-water-mark" />
        <div
          className="pop-over-button"
          onClick={() => setOpenEditorOption(!openEditorOption)}
        >
          Editor Options
        </div>
        {openEditorOption && (
          <div ref={modalRef} className="neweditor-buttons-container">
            {location.pathname !== "/editvisiting-card" && (
              <button
                className="neweditor-remove-button"
                onClick={removeBackground}
              >
                Remove Background & Download
              </button>
            )}

            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="neweditor-file-input"
              onChange={handleFileChange}
            />
            <button
              className="neweditor-remove-button"
              onClick={handleTemplateExport}
            >
              Export Templates
            </button>
            <button
              className="neweditor-download-button"
              onClick={() => document.getElementById("templateInput").click()}
            >
              Import Templates
            </button>
            <input
              type="file"
              id="templateInput"
              accept="application/json"
              onChange={handleTemplateImport}
              style={{ display: "none" }}
            />
            <button
              className="neweditor-close-button"
              onClick={handleCustomButtonClick}
            >
              Close Editor
            </button>
            <button
              className="neweditor-close-button"
              onClick={exportHighResImage}
            >
              {/* Export High-Res Image (300 DPI) */}
              Add Template To Cart
            </button>
            <button
              className="editor-option-close-button"
              onClick={() => setOpenEditorOption(!openEditorOption)}
            >
              X
            </button>
          </div>
        )}
      </PolotnoContainer>
      {imageUrl && (
        <div className="neweditor-container">
          <img
            src={imageUrl}
            alt="background-removed-image"
            className="neweditor-image"
          />
          <button
            className="neweditor-download-button"
            onClick={() => {
              fetch(imageUrl)
                .then((response) => response.blob())
                .then((blob) => {
                  saveAs(blob, "background-removed-image.png");
                  setImageUrl(null);
                })
                .catch((error) => {
                  console.error("Error downloading the image:", error);
                });
            }}
          >
            Download
          </button>
        </div>
      )}
    </>
  );
};
