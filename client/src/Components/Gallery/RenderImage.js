import React from "react";
import HoverButtons from "./HoverButtons";

function RenderImage(props) {
  const { images, setImages, getImageSize, focusOnImage, page } = props;

  function viewIcons(value, bool) {
    props.setImages((prevImageData) => {
      const newData = prevImageData.map((newImageData) =>
        newImageData.value === value
          ? { ...newImageData, showicon: bool }
          : { ...newImageData, showicon: false }
      );
      return newData;
    });
  }

  function renderImages(val) {
    const column = images.map((image) => {
      const size = getImageSize(images[image.value].size);

      if ((image.value % 3) + 1 === val) {
        return (
          <div
            key={image.imageURL}
            className="renderimage--image-block"
            title={
              "Name: " +
              images[image.value].name +
              "\nDimensions: " +
              images[image.value].dimensions +
              "\nSize: " +
              size
            }
            onDoubleClick={() => {
              focusOnImage(image.value, true);
            }}
            onMouseEnter={() => {
              viewIcons(image.value, true);
            }}
            onMouseLeave={() => {
              viewIcons(image.value, false);
            }}
          >
            {images[image.value].showicon && (
              <HoverButtons
                images={images}
                image={image}
                setImages={setImages}
                page={page}
              />
            )}
            <img
              src={image.imageURL}
              alt="myimg"
              className="renderimage--image"
            />
          </div>
        );
      }
      return "";
    });
    return column;
  }

  return (
    <div id="renderimage--container">
      <div className="renderimage--column" id="renderimage--column1">
        {renderImages(1)}
      </div>
      <div className="renderimage--column" id="renderimage--column2">
        {renderImages(2)}
      </div>
      <div className="renderimage--column" id="renderimage--column3">
        {renderImages(3)}
      </div>
    </div>
  );
}

export default RenderImage;
