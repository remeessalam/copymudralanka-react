
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
import {
  getTemplates,
  addTemplate,
  // deleteAllTemplates,
  removeBackgrounds,
} from "../../apiCalls";
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
      <FaFileAlt style={{ marginBottom: 8, fontSize: '36px' }} /> {/* Increased icon size */}
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
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 2fr))",
            gap: 16,
            overflowY: "auto", // Adds vertical scrollbar
            flexGrow: 1, // Ensures the grid takes up available space
            paddingRight: "8px", // To avoid cutting off scrollbar
            maxHeight: "calc(100vh - 40px)", // Subtracting padding for the full height adjustment
          }}
        >
          {templates.map((template, index) => (
            <div
              key={template._id || index}
              style={{
                border: "1px solid #ddd",
                borderRadius: 4,
                padding: 10,
                cursor: "pointer",
                display: "flex",
                height: "300px",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
                boxSizing: "border-box",
              }}
              onClick={() => onTemplateClick(template.template)} // Load template on click
            >
              {template.template.pages[0].children[0].src ? (
                <img
                  src={template.template.pages[0].children[0].src} // Assuming the template contains an image URL
                  alt={template.name || `Template ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 4,
                    objectFit: "contain", // Ensures image fits without distortion
                    marginBottom: 8,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "200px", // Placeholder size for templates without images
                    backgroundColor: "#e0e0e0",
                    borderRadius: 4,
                    marginBottom: 8,
                  }}
                />
              )}
              <div style={{ textAlign: "center", fontWeight: "bold" }}>
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
      setTemplates(response.data.templates || []);
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

  const handleTemplateImport = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedTemplate = JSON.parse(e.target.result);

        // Use addTemplate API to save the imported template
        await addTemplate({name: "name", template: importedTemplate});
        
        toast.success("Template imported successfully!");
        fetchTemplates(); // Refresh the templates list after import
      } catch (err) {
        console.error("Error importing template:", err);
        toast.error("Failed to import template.");
      }
    };
    reader.readAsText(file);
  };

  const handleTemplateExport = () => {
    const templateJSON = store.toJSON(); // Get the current state as JSON
    const blob = new Blob([JSON.stringify(templateJSON, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "template.json"); // Use FileSaver.js to trigger download
    toast.success("Template exported successfully!");
  };

  const handleTemplateClick = (template) => {
    store.loadJSON(template); // Load the template into Polotno store
  };

  return (
    <PolotnoContainer style={{ width: "100vw", height: "100vh" }}>
      <SidePanelWrap>
        <SidePanel
          store={store}
          sections={[
            ...DEFAULT_SECTIONS.filter((section) => section.name !== "templates"),
            { ...customTemplatesSection, Panel: () => <customTemplatesSection.Panel templates={templates} onTemplateClick={handleTemplateClick} /> },
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