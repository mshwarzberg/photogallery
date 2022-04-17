import React from 'react'

function ViewFocus(props) {

  const images = props.images
  const imageData = props.imageData

  const renderFocus = images.map((image) => {
    if (imageData[image.value]) {
      const size = props.getImageSize(imageData[image.value].filesize);
      if (imageData[image.value].active) {
        return (
          <div
            key={image.imageURL}
            id="viewphotos--focus"
            onClick={() => {
              props.focusOnImage(image.value, false);
            }}
            // onTouchMove={() => {
            //   props.focusOnImage(image.value, false)
            // }}
          >
            <img
              id="viewphotos--focus-image"
              src={image.imageURL}
              alt="focus"
              title={
                "Name: " +
                imageData[image.value].name +
                "\nDimensions: " +
                imageData[image.value].dimensions +
                "\nSize: " +
                size
              }
            />
          </div>
        );
      }
    }
    return "";
  });
  return (
    <div className="page">{renderFocus}</div>
  )
}

export default ViewFocus