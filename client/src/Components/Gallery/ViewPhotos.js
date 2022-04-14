import React, { useEffect, useState } from "react";
import Trash from "../../images/Trash.png";

function ViewPhotos() {
  const [APIcalls, setAPIcalls] = useState(0);
  const [images, setImages] = useState([]);

  const [imageData, setImageData] = useState([
    {
      imageid: "",
      name: "",
      dimensions: "",
      filesize: 0,
    },
  ]);

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
      setAPIcalls(0);
    }
  };

  useEffect(() => {
    setImageData((prevImageData) => {
      prevImageData = prevImageData.splice(1, prevImageData.length - 1);
      return prevImageData;
    });
  }, []);

  

  useEffect(() => {
    function getImageData() {
      if (APIcalls < 25) {
        fetch("api/gallery/getid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: sessionStorage.getItem("token"),
            reqNum: APIcalls,
          }),
        })
          .then(async (res) => {
            const response = await res.json();
            console.log(response);
            let imageRatio =
              response.dimensions.split("x")[0] /
              response.dimensions.split("x")[1];
            if (imageRatio <= 0.6) {
              imageRatio = "ultratall";
            } else if (imageRatio <= 0.85) {
              imageRatio = "tall";
            } else if (imageRatio <= 1.15) {
              imageRatio = "square";
            } else if (imageRatio <= 1.9) {
              imageRatio = "wide";
            } else {
              imageRatio = "ultrawide";
            }
            setImageData((prevImageData) => [
              ...prevImageData,
              {
                imageratio: imageRatio,
                showicon: false,
                active: false,
                value: APIcalls,
                imageid: response.imageid,
                name: response.name,
                servername: response.servername,
                dimensions: response.dimensions,
                filesize: response.filesize,
              },
            ]);
          })
          .catch((err) => {
            return;
          });

        fetch("api/gallery", {
          method: "GET",
        })
          .then(async (res) => {
            const response = await res.blob();
            const imageURL = URL.createObjectURL(response);
            setImages((prevImages) => [
              ...prevImages,
              { imageURL, value: APIcalls },
            ]);
            setAPIcalls(APIcalls + 1);
          })
          .catch((err) => {
            return;
          });
      }
    }
    getImageData();
  }, [APIcalls, setAPIcalls]);

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
    setImageData((prevImageData) => {
      const newData = prevImageData.map((newImageData) =>
        newImageData.value === value
          ? { ...newImageData, active: bool }
          : { ...newImageData, active: false }
      );
      return newData;
    });
  }

  const renderImages = images.map((image) => {
    if (imageData[image.value]) {
      const size = getImageSize(imageData[image.value].filesize);
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
          onClick={() => {
            focusOnImage(image.value, true);
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
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                  for (let i = 0; i < imageData.length; i++) {
                    if (imageData[i].servername === imageData[image.value].servername) {
                      setImageData((prevImageData) => {
                        prevImageData.splice(i, 1)
                        return prevImageData
                      });
                      setImages((prevImages) => {
                        prevImages.splice(i, 1)
                        return prevImages
                      });
                    }
                  }
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

  const renderFocus = images.map((image) => {
    if (imageData[image.value]) {
      const size = getImageSize(imageData[image.value].filesize);
      if (imageData[image.value].active) {
        return (
          <div
            key={image.imageURL}
            id="viewphotos--focus"
            onClick={() => {
              focusOnImage(image.value, false);
            }}
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
    <div className="page" id="viewphotos--page">
      <h1>{APIcalls} images loaded</h1>
      <div id="viewphotos--grid">{renderImages}</div>
      {renderFocus}
    </div>
  );
}

export default ViewPhotos;
