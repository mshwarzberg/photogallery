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
              active: focus,
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
        newImageData.value + 1 == value
          ? { ...newImageData, active: !focus }
          : { ...newImageData, active: false }
      );
      setFocus(!focus);
      return newData;
    });
  }
  const renderImages = images.map((image) => {
    let size = imageData[image.value + 1].filesize
    if (size > 1000 && size < 950000) {
      size = size / 1000 + 'KB'
    }
    if (size >= 950000 && size < 950000000) {
      size = size / 1000000 + 'MB'
    }
    return <img
      className={
        imageData[image.value + 1].isWide
          ? "viewphotos--wide"
          : "viewphotos--tall"
      }
      id={
        imageData[image.value].active
          ? "viewphotos--image-active"
          : "viewphotos--image-inactive"
      }
      alt="myimg"
      src={image.imageURL}
      key={image.value}
      title={
        "Name: " +
        imageData[image.value + 1].name +
        "\nDimensions: " +
        imageData[image.value + 1].dimensions +
        '\nSize: ' +
        size
      }
      onClick={() => {
        focusOnImage(image.value);
      }}
    />
    });

  return (
    <div className="page" id="viewphotos--page">
      <div id="viewphotos--grid">{renderImages}</div>
    </div>
  );
}

export default ViewPhotos;
