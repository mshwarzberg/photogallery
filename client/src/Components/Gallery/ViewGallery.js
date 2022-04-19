import React, { useEffect, useState } from "react";
import RenderImage from "./RenderImage";
import FocusOnImage from "./FocusOnImage";
import { useNavigate } from "react-router-dom";

function ViewGallery(props) {

  const myTokens = props

  const navigate = useNavigate()
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {


    fetch("/api/profile/getinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: localStorage.getItem("id"),
      }),
    })
      .then(async (res) => {
        const response = await res.json();
        if (response.err) {
          console.log('viewgallery', response);
        }
      })
      .catch((err) => console.log(err));
      return () => {}
  }, [navigate, myTokens])

  useEffect(() => {
    
    fetch("api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("id"),
        currentindex: currentIndex,
      }),
    })
      .then(async (res) => {
        const response = await res.blob();
        const imageURL = URL.createObjectURL(response);
        if (!res.headers) {
          return
        }
        let imageRatio =
          res.headers.get("dimensions").split("x")[0] /
          res.headers.get("dimensions").split("x")[1];
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

        setImages((prevImages) => [
          ...prevImages,
          {
            imageURL,
            name: res.headers.get("originalname"),
            dimensions: res.headers.get("dimensions"),
            size: res.headers.get("filesize"),
            value: res.headers.get("value"),
            nameinserver: res.headers.get("nameinserver"),
            focused: false,
            imageratio: imageRatio,
            showicon: false,
          },
        ]);
        if (currentIndex < res.headers.get("filestoload")) {
          setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
        }
      })
      .catch((err) => {
        return
      });

    return () => {};
  }, [currentIndex, setCurrentIndex]);

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
    <div className="page" id="viewgallery--page">
      <div id="viewgallery--info-header"><h1 id={props.showNav ? "viewgallery--header-text-shown" : "viewgallery--header-text-hidden"}>{images.length} images loaded</h1></div>
      <RenderImage
        images={images}
        focusOnImage={focusOnImage}
        setImages={setImages}
        getImageSize={getImageSize}
      />
      <FocusOnImage
        images={images}
        focusOnImage={focusOnImage}
        getImageSize={getImageSize}
      />
    </div>
  );
}

export default ViewGallery;
