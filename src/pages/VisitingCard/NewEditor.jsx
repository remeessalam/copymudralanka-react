import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";

import { createDemoApp } from "polotno/polotno-app";
import { useNavigate } from "react-router-dom";

// import css styles from blueprint framework (used by polotno)
// if you bundler doesn't support such import you can use css from CDN (see bellow)
import "@blueprintjs/core/lib/css/blueprint.css";
import { IoMdCloseCircle } from "react-icons/io";

const { store } = createDemoApp({
  container: document.getElementById("root"),
  key: "QTbtE3xruoaFYCgHfrd5", // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

const NewEditor = () => {
  const navigate = useNavigate();
  const handleCustomButtonClick = () => {
    navigate("/visitingcard");
  };
  return (
    <PolotnoContainer style={{ width: "100vw", height: "100vh" }}>
      <SidePanelWrap>
        <SidePanel store={store} sections={""} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
      <button
        onClick={handleCustomButtonClick}
        style={{
          position: "absolute",
          top: "55px",
          left: "50%", // Horizontally center the button
          transform: "translateX(-50%)",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: "10000",
          // display: "flex",
          // alignItems: "center",
          // gap: "10px",
        }}
      >
        {/* <IoMdCloseCircle /> */}
        Close Editor
      </button>
    </PolotnoContainer>
  );
};
export default NewEditor;
