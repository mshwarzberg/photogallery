import React from 'react'
import Trash from "../../images/Trash.png";

function RenderImage(props) {

  const imageData = props.imageData
  const setImageData = props.setImageData
  const images = props.images
  const setImages = props.setImages

  function viewIcons(value, bool) {
    setImageData((prevImageData) => {
      const newData = prevImageData.map((newImageData) =>
        newImageData.value === value
          ? { ...newImageData, showicon: bool }
          : { ...newImageData, showicon: false }
      );
      return newData;
    });
  }

  const renderImages = images.map((image) => {
    if (imageData[image.value]) {
      const size = props.getImageSize(imageData[image.value].filesize);
      const htmlclass = `viewphotos--image-${
        imageData[image.value].imageratio
      }`;
      return (
        <div
          className="viewphotos--image-block"
          id={htmlclass}
          title={
            "Name: " +
            imageData[image.value].name +
            "\nDimensions: " +
            imageData[image.value].dimensions +
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
          key={image.imageURL}
        >
          {imageData[image.value].showicon && (
            <img
              src={Trash}
              alt="trash"
              id="viewphotos--trash-icon"
              title="Put in trash"
              onClick={(event) => {
                fetch("/api/manage/delete", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    id: sessionStorage.getItem("token"),
                    servername: imageData[image.value].servername,
                  }),
                })
                  .then((res) => {
                    setImageData((prevImageData) => {
                      const newData = prevImageData.map((data) => ({
                        ...data,
                        value:
                          data.value > images[image.value].value
                            ? data.value - 1
                            : data.value,
                      }));
                      return newData;
                    });
                    setImages((prevImages) => {
                      const newData = prevImages.map((data) => ({
                        ...data,
                        value:
                          data.value > images[image.value].value
                            ? data.value - 1
                            : data.value,
                      }));
                      return newData;
                    });
                    props.setTotalAPIcalls((prevTotalAPIcalls) => [
                      ...prevTotalAPIcalls,
                      prevTotalAPIcalls[prevTotalAPIcalls.length - 1] - 1,
                    ]);
                    for (let i = 0; i < imageData.length; i++) {
                      if (
                        imageData[i].servername ===
                        imageData[image.value].servername
                      ) {
                        setImageData((prevImageData) => {
                          prevImageData.splice(i, 1);
                          return prevImageData;
                        });
                        setImages((prevImages) => {
                          prevImages.splice(i, 1);
                          return prevImages;
                        });
                      }
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                event.stopPropagation();
              }}
            />
          )}
          <img
            alt="gallery"
            src={image.imageURL}
            className="viewphotos--image"
          />
        </div>
      );
    }
    return "";
  });
  return (
    <div className='page' id="viewphotos--grid">
      {renderImages}
    </div>
  )
}

export default RenderImage