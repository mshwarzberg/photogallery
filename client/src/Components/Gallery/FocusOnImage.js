import React from "react";

function FocusOnImage(props) {
  const images = props.images;

  const renderFocus = images.map((image) => {
    const size = props.getImageSize(images[image.value].size);
    if (images[image.value].focused) {
      return (
        <div
          key={image.imageURL}
          id="focusonimage--focus"
          onClick={() => {
            props.focusOnImage(image.value, false);
          }}
        >
          <img
            id="focusonimage--focus-image"
            src={image.imageURL}
            alt="focus"
            title={
              "Name: " +
              images[image.value].name +
              "\nDimensions: " +
              images[image.value].dimensions +
              "\nSize: " +
              size
            }
          />
        </div>
      );
    }
    return "";
  });

  return <div className="page">{renderFocus}</div>;
}

export default FocusOnImage;
