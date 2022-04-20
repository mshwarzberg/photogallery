import React, { useEffect, useState } from "react";
import RenderGalleryPage from "./RenderGalleryPage";

function Gallery(props) {

  const [isTrash, setIsTrash] = useState()
  const [isFavorites, setIsFavorites] = useState()
  const [images, setImages] = useState([]);
  const [resetNumber, setResetNumber] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { showNav } = props

  useEffect(() => {
    if (window.location.href.includes('trash')) {
      setIsTrash('trash')
    } else if (window.location.href.includes('favorites')) {
      setIsFavorites('favorites')
    }
  }, [])

  useEffect(() => {
    if (currentIndex < 25) {
      fetch("api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: localStorage.getItem("id"),
          currentindex: currentIndex,
          resetnumber: resetNumber,
          category: isTrash || isFavorites
        }),
      })
        .then(async (res) => {
          const response = await res.blob();
          const imageURL = URL.createObjectURL(response);
          if (!res.headers) {
            return;
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
              value: images.length || 0,
              nameinserver: res.headers.get("nameinserver"),
              focused: false,
              imageratio: imageRatio,
              showicon: false,
            },
          ]);
          setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
        })
        .catch((err) => {
          return;
        });
    }
    return () => {};
  }, [currentIndex, setCurrentIndex]);

  return (
    <div>
      <RenderGalleryPage
        images={images}
        setImages={setImages}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        resetNumber={resetNumber}
        setResetNumber={setResetNumber}
        showNav={showNav}
      />
    </div>
  );
}

export default Gallery;
