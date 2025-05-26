import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { InputGroup } from "@blueprintjs/core";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import { SectionTab } from "polotno/side-panel";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";
import { getImageSize } from "polotno/utils/image";
import "@blueprintjs/core/lib/css/blueprint.css";

export const PhotosPanel = observer(({ store }) => {
  const [images, setImages] = React.useState([]);
  async function loadImages() {
    const storedImageUrl = localStorage.getItem("selectedImage");

    setImages([]);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setImages([
      { url: "./carlos-lindner-zvZ-HASOA74-unsplash.jpg" },
      { url: "./guillaume-de-germain-TQWJ4rQnUHQ-unsplash.jpg" },
    ]);
    if (storedImageUrl) {
      setImages([{ url: storedImageUrl }]);
    }
  }

  React.useEffect(() => {
    loadImages();
  }, []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <InputGroup
        leftIcon="search"
        placeholder="Search..."
        onChange={(e) => {
          loadImages();
        }}
        style={{ marginBottom: "20px" }}
      />
      <p>Demo images: </p>
      <ImagesGrid
        images={images}
        getPreview={(image) => image.url}
        onSelect={async (image, pos) => {
          const { width, height } = await getImageSize(image.url);
          store.activePage.addElement({
            type: "image",
            src: image.url,
            width,
            height,
            x: pos ? pos.x : store.width / 2 - width / 2,
            y: pos ? pos.y : store.height / 2 - height / 2,
          });
        }}
        rowsNumber={2}
        isLoading={!images.length}
        loadMore={false}
      />
    </div>
  );
});

export const CustomPhotos = {
  name: "photos",
  Tab: (props) => (
    <SectionTab name="Photos" {...props}>
      <MdPhotoLibrary />
    </SectionTab>
  ),
  Panel: PhotosPanel,
};
