import React, { useContext, useState } from "react";
import {
  createDemoApp,
  PolotnoContainer,
  SidePanelWrap,
  WorkspaceWrap,
} from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";

import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "@blueprintjs/core/lib/css/blueprint.css";
import { removeBackgrounds } from "../../apiCalls";
import { saveAs } from "file-saver"; // Import the FileSaver.js library
import { SpinnerContext } from "../../components/SpinnerContext";
import "./components/newEditor.css";

const { store } = createDemoApp({
  container: document.getElementById("root"),
  key: "QTbtE3xruoaFYCgHfrd5", // Replace with your valid key.
  showCredit: true,
});

const NewEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [backgroundRemoved, setBackgroundRemoved] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const { setLoading } = useContext(SpinnerContext);

  const handleCustomButtonClick = () => {
    location.pathname === "/editvisiting-card"
      ? navigate("/visitingcard")
      : navigate("/sticker-printing");
  };

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
        setImageUrl(processedImageUrl);
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

  // New: Import Template Functionality
  const handleTemplateImport = (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const templateJSON = JSON.parse(e.target.result);
        store.loadJSON(templateJSON); // Load template into Polotno store
        toast.success("Template imported successfully!");
      } catch (error) {
        console.error("Error loading template:", error);
        toast.error("Invalid template file.");
      }
    };
    reader.readAsText(file);
  };

  const triggerTemplateInput = () => {
    document.getElementById("templateInput").click();
  };

  // New: Export Template Functionality
  const handleTemplateExport = () => {
    const templateJSON = store.toJSON(); // Get the current state as JSON
    const blob = new Blob([JSON.stringify(templateJSON, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "template.json"); // Use FileSaver.js to trigger download
    toast.success("Template exported successfully!");
  };

  return (
    <>
      <PolotnoContainer style={{ width: "100vw", height: "100vh" }}>
        <SidePanelWrap>
          <SidePanel store={store} sections={""} />
        </SidePanelWrap>
        <WorkspaceWrap>
          <Toolbar store={store} downloadButtonEnabled />
          <Workspace store={store} />
          <ZoomButtons store={store} />
        </WorkspaceWrap>
        <div className="neweditor-buttons-container">
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
            className="neweditor-close-button"
            onClick={handleCustomButtonClick}
          >
            Close Editor
          </button>

          <input
            type="file"
            id="templateInput"
            accept="application/json"
            className="neweditor-file-input"
            onChange={handleTemplateImport}
            style={{ display: "none" }}
          />
          <button
            className="neweditor-download-button"
            onClick={triggerTemplateInput}
          >
            Import Template
          </button>

          {/* New: Export Template Button */}
          <button
            className="neweditor-download-button"
            onClick={handleTemplateExport}
          >
            Export Template
          </button>
        </div>
        <div className="neweditor-cover" />
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

export default NewEditor;
