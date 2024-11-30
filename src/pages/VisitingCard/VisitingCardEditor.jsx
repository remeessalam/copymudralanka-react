import React, { useState } from "react";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
import "./VisitingCardEditor.css";
const VisitingCardEditor = ({ image, onImageSave, handleButtonClick }) => {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);

  const openImgEditor = () => {
    !image && handleButtonClick();
    if (image) {
      setIsImgEditorShown(true);
    }
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  const handleSave = (editedImageObject) => {
    if (editedImageObject) {
      onImageSave(editedImageObject.imageBase64);
    }
    closeImgEditor();
  };

  return (
    <div className="container-visitingcard">
      <button
        onClick={openImgEditor}
        className="secondary-btn w-auto mx-auto mt-3"
      >
        {!image ? "Edit Visiting Card" : "open editor"}
      </button>
      {isImgEditorShown && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <FilerobotImageEditor
              source={image}
              onSave={handleSave}
              onClose={closeImgEditor}
              annotationsCommon={{
                fill: "#ff0000",
              }}
              Text={{ text: "Add you text..." }}
              Rotate={{
                angle: 90,
                componentType: "slider",
              }}
              Crop={{
                presetsItems: [
                  {
                    titleKey: "classicTv",
                    descriptionKey: "4:3",
                    ratio: 4 / 3,
                  },
                  {
                    titleKey: "cinemascope",
                    descriptionKey: "21:9",
                    ratio: 21 / 9,
                  },
                ],
                presetsFolders: [
                  {
                    titleKey: "socialMedia",
                    groups: [
                      {
                        titleKey: "facebook",
                        items: [
                          {
                            titleKey: "profile",
                            width: 180,
                            height: 180,
                            descriptionKey: "fbProfileSize",
                          },
                          {
                            titleKey: "coverPhoto",
                            width: 820,
                            height: 312,
                            descriptionKey: "fbCoverPhotoSize",
                          },
                        ],
                      },
                    ],
                  },
                ],
              }}
              tabsIds={[TABS.ANNOTATE]}
              defaultTabId={TABS.ANNOTATE}
              defaultToolId={TOOLS.TEXT}
            />
          </div>
        </div>
      )}
    </div>
  );
};
// TABS.ADJUST,TABS.WATERMARK
export default VisitingCardEditor;
