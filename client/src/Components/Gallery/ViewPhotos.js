import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewPhotos() {
  const [focus, setFocus] = useState(false);
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

  function getImageSize(value) {
    let size
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
    return size
  }

  useEffect(() => {
    function getImageData() {
      axios
        .post("http://localhost:5000/gallery/getid", {
          id: sessionStorage.getItem("token"),
          reqNum: APIcalls,
        })
        .then((res) => {
          const tallOrWideImage =
            res.data.dimensions.split("x")[0] /
            res.data.dimensions.split("x")[1];
          setImageData((prevImageData) => [
            ...prevImageData,
            {
              isWide: tallOrWideImage > 1 ? true : false,
              active: false,
              value: APIcalls,
              imageid: res.data.imageid,
              name: res.data.name,
              dimensions: res.data.dimensions,
              filesize: res.data.filesize,
            },
          ]);
        })
        .catch((err) => {
          return;
        });
      axios
        .get("http://localhost:5000/gallery", { responseType: "blob" })
        .then((res) => {
          const imageURL = URL.createObjectURL(res.data);
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
    getImageData();
  }, [APIcalls, setAPIcalls]);

  function focusOnImage(value) {
    setImageData((prevImageData) => {
      const newData = prevImageData.map((newImageData) =>
        newImageData.value + 1 === value
          ? { ...newImageData, active: !focus }
          : { ...newImageData, active: false }
      );
      setFocus(!focus);
      return newData;
    });
  }

  const renderImages = images.map((image) => {
    const size = getImageSize(imageData[image.value + 1].filesize)
    return (
      <img
        className={
          imageData[image.value + 1].isWide
            ? "viewphotos--wide"
            : "viewphotos--tall"
        }
        id="viewphotos--image"
        alt="gallery"
        src={image.imageURL}
        key={image.value}
        title={
          "Name: " +
          imageData[image.value + 1].name +
          "\nDimensions: " +
          imageData[image.value + 1].dimensions +
          "\nSize: " +
          size
        }
        onClick={() => {
          focusOnImage(image.value);
        }}
      />
    );
  });

  const renderFocus = images.map((image) => {
    const size = getImageSize(imageData[image.value + 1].filesize)
    if (imageData[image.value].active) {
      return (
        <div
          key={image.imageURL}
          id="viewphotos--focus"
          onClick={() => {
            focusOnImage(image.value);
          }}
        >
          <img
            id="viewphotos--focus-image"
            src={image.imageURL}
            alt="focus"
            title={
              "Name: " +
              imageData[image.value + 1].name +
              "\nDimensions: " +
              imageData[image.value + 1].dimensions +
              "\nSize: " +
              size
            }
          />
        </div>
      );
    }
    return ''
  });

  return (
    <div className="page" id="viewphotos--page">
      <div id="viewphotos--grid">{renderImages}</div>
      {renderFocus}
    </div>
  );
}

export default ViewPhotos;
