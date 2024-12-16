
import React, { useContext, useEffect, useState } from "react";
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
import { FaFileAlt } from 'react-icons/fa';

// Initialize the Polotno app
const { store } = createDemoApp({
  container: document.getElementById("root"),
  key: "QTbtE3xruoaFYCgHfrd5", // Replace with your valid key.
  showCredit: true,
});

const customTemplatesSection = {
  name: "customTemplates",
  Tab: (props) => (
    <div {...props} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <FaFileAlt style={{ marginBottom: 8, fontSize: '30px', marginTop: 8 }} /> {/* Increased icon size */}
      <div>Templates</div>
    </div>
  ),
  Panel: ({ templates, onTemplateClick }) => {
    if (!templates.length) {
      return <div style={{ padding: 20 }}>No templates available.</div>;
    }
    return (
      <div style={{ padding: 20, height: '100vh', display: 'flex', flexDirection: 'column' }}>
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
                  backgroundImage: template.base64Template
                    ? `url(data:image/png;base64,${template.base64Template})` // Use base64 data for image preview
                    : "",
                  backgroundSize: "cover", // Ensures the image covers the entire container
                  backgroundPosition: "center", // Centers the image
                  objectFit: "cover", // Ensures the image fills the container without distortion
                }}
              >
                {/* This will render the preview if base64Template is available */}
              </div>
              <div style={{ textAlign: "center", fontWeight: "bold", marginTop: 8 }}>
                {template.name || `Template ${index + 1}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};



export const NewEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading } = useContext(SpinnerContext);
  const [templates, setTemplates] = useState([]);

  // Fetch templates on component mount or when button is clicked
  const fetchTemplates = async () => {
    try {
      setLoading(true); // Set loading state
      const response = await getTemplates();
      const templatesWithPreview = await Promise.all(response.data.templates.map(async (template) => {
        // Fetch the template JSON for each template
        const templateResponse = await getTemplate(template);
        
        // Create a FileReader to read the JSON blob
        const reader = new FileReader();
        const templateBlob = new Blob([templateResponse.data], { type: 'application/json' });

        return new Promise((resolve) => {
          reader.onload = async (e) => {
            try {
              // Parse the template and load it into Polotno store
              const templateData = JSON.parse(e.target.result);

              // Generate base64 preview image
              store.loadJSON(templateData);
              const maxWidth = 200;
              const scale = maxWidth / store.width;
              const base64Image = await store.toDataURL({ pixelRatio: scale });

              // Save the base64 image to the template object
              template.base64Template = base64Image.split('base64,')[1];

              resolve(template);
            } catch (parseError) {
              console.error('Failed to parse template:', parseError);
              resolve(template); // Resolve template even if there's an error
            }
          };
          reader.readAsText(templateBlob);
        });
      }));

      setTemplates(templatesWithPreview || []);
      setLoading(false); // Reset loading state
    } catch (err) {
      console.error("Error fetching templates:", err);
      setLoading(false); // Reset loading state
      toast.error("Failed to load templates.");
    }
  };

  useEffect(() => {
    // Fetch templates on initial render
    fetchTemplates();
  }, []);

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

    const name = "Template Name"; // You can dynamically change this name if needed
    formData.append("file", file);
    formData.append("name", name);

    try {
      const response = addTemplate(formData);

      toast.success("Template uploaded successfully!");
      fetchTemplates(); // Refresh the templates list
    } catch (err) {
      console.error("Error uploading template:", err);
      toast.error("Failed to upload template.");
    }
  };

  const handleTemplateClick = async (template) => {
    try {
      console.log("Clicked Template:", template);
      console.log("Attempting to fetch template with FileID:", template.fileId);

      const response = await getTemplate(template);

      console.log(response)

      // Create a FileReader to read the blob
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          // Parse the file content
          const templateData = JSON.parse(e.target.result);

          // Load into Polotno store
          store.loadJSON(templateData);
        } catch (parseError) {
          console.error('Failed to parse template:', parseError);
          toast.error("Invalid template format");
        }
      };

      reader.readAsText(response.data);
      // Rest of your existing logic for processing the template
    } catch (error) {
      console.error('Template fetch error:', error);
      toast.error("Failed to load template");
    }
  };

  return (
    <PolotnoContainer style={{ width: "100vw", height: "100vh" }}>
      <SidePanelWrap>
        <SidePanel
          store={store}
          sections={[
            { ...customTemplatesSection, Panel: () => <customTemplatesSection.Panel templates={templates} onTemplateClick={handleTemplateClick} /> },
            ...DEFAULT_SECTIONS.filter((section) => section.name !== "templates"),
          ]}
        />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
      <div className="neweditor-buttons-container">
        <button className="neweditor-remove-button" onClick={handleTemplateExport}>
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
        <button className="neweditor-close-button" onClick={handleCustomButtonClick}>
          Close Editor
        </button>
      </div>
    </PolotnoContainer>
  );
};


export default NewEditor;