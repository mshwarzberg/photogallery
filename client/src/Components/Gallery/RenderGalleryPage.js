import React from "react";
import { useNavigate } from "react-router-dom";

import RenderImage from "./RenderImage";
import FocusOnImage from "./FocusOnImage";

function RenderGalleryPage(props) {
  const navigate = useNavigate();

  const {
    images,
    setImages,
    currentIndex,
    setCurrentIndex,
    setResetNumber,
    page,
  } = props;

  function getImageSize(value) {
    let size;

    if (value > 1000 && value < 950000) {
      size = value / 1000;
      size = size.toString().slice(0, 3);
      size += "KB";
    }
    if (value >= 950000 && value < 950000000) {
      size = value / 1000000;
      size = size.toString().slice(0, 3);
      size += "MB";
    }
    return size;
  }

  function focusOnImage(value, bool) {
    setImages((prevImageData) => {
      const newData = prevImageData.map((newimage) =>
        newimage.value === value
          ? { ...newimage, focused: bool }
          : { ...newimage, focused: false }
      );
      return newData;
    });
  }

  return (
    <div className="page" id="rendergallerypage--page">
      <div id="rendergallerypage--header-area">
        <select id="rendergallerypage--header-sort">
          <option selected disabled hidden>
            SORT IMAGES BY ↓
          </option>
          <option value="name" className="rendergallerypage--header-option">
            Name
          </option>
          <option value="date" className="rendergallerypage--header-option">
            Date Added
          </option>
          <option value="size" className="rendergallerypage--header-option">
            File Size
          </option>
          <option value="random" className="rendergallerypage--header-option">
            Randomly
          </option>
        </select>
        <h1 id="rendergallerypage--header-text">
          {images.length
            ? `${images.length} IMAGES LOADED`
            : "NOTHING HERE. UPLOAD IMAGES TO VIEW THEM HERE"}
        </h1>
        <div id="rendergallerypage--header-buttons">
          {!window.location.href.includes("trash") && (
            <button
              id="rendergallerypage--header-trash"
              onClick={() => {
                navigate("/gallery/trash");
                return window.location.reload(true);
              }}
            >
              TRASH
            </button>
          )}
          {!window.location.href.includes("favorites") && (
            <button
              id="rendergallerypage--header-favorites"
              onClick={() => {
                navigate("/gallery/favorites");
                return window.location.reload(true);
              }}
            >
              FAVORITES
            </button>
          )}
        </div>
      </div>
      <RenderImage
        images={images}
        focusOnImage={focusOnImage}
        setImages={setImages}
        getImageSize={getImageSize}
        page={page}
      />
      <FocusOnImage
        images={images}
        focusOnImage={focusOnImage}
        getImageSize={getImageSize}
      />
      <button
        disabled={currentIndex < 25}
        id="rendergallerypage--loadmore"
        onClick={() => {
          setResetNumber((prevNumber) => prevNumber + 1);
          setCurrentIndex(0);
        }}
      >
        LOAD MORE
      </button>
    </div>
  );
}

export default RenderGalleryPage;
