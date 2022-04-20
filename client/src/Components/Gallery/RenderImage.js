import React from "react";
import Trash from "../../images/Trash.png";

function RenderImage(props) {
  
  const images = props.images;

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

  const renderImages = images.map((image) => {

    const size = props.getImageSize(images[image.value].size);
    const htmlclass = `renderimage--image-${images[image.value].imageratio}`;
    
    return (
      <div
        key={image.imageURL}
        className="renderimage--image-block"
        id={htmlclass}
        title={
          "Name: " +
          images[image.value].name +
          "\nDimensions: " +
          images[image.value].dimensions +
          "\nSize: " +
          size
        }
        onDoubleClick={() => {
          props.focusOnImage(image.value, true);
        }}
        onMouseEnter={() => {
          viewIcons(image.value, true);
        }}
        onMouseLeave={() => {
          viewIcons(image.value, false);
        }}
      >
        {images[image.value].showicon && (
          <img
            src={Trash}
            alt="trash"
            id="renderimage--trash-icon"
            title="Put in trash"
            onClick={() => {
              
              fetch("api/manage/delete", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  nameinserver: images[image.value].nameinserver,
                  id: localStorage.getItem("id"),
                }),
              })
                .then((res) => {
                  
                  props.setImages((prevImages) => {
                    prevImages.splice(image.value, 1);
                    const newData = prevImages.map((newimage) => {
                      
                      return {
                        ...newimage,
                        value:
                              newimage.value > image.value
                                ? newimage.value - 1
                                : newimage.value,
                      };
                    });
                    return newData;
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        )}
        <img src={image.imageURL} alt="myimg" className="renderimage--image" />
      </div>
    );
  });

  return (
    <div className="page" id="renderimage--grid">
      {renderImages}
    </div>
  );
}

export default RenderImage;
