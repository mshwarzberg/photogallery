import React, { useEffect, useState } from "react";
import RenderGalleryPage from "./RenderGalleryPage";

function Gallery(props) {

  const [page, setPage] = useState()
  const [images, setImages] = useState([]);
  const [resetNumber, setResetNumber] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { showNav } = props

  useEffect(() => {

    if (window.location.href.includes('trash') ) {
      setPage('trash')
    } else if (window.location.href.includes('favorites')) {
      setPage('favorites')
    } else {
      setPage('gallery')
    }
    
  }, [])

  useEffect(() => {
    if (currentIndex < 25 && page) {
      fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: localStorage.getItem("id"),
          currentindex: currentIndex,
          resetnumber: resetNumber,
          category: page
        }),
      })
        .then(async (res) => {
          const response = await res.blob();
          const imageURL = URL.createObjectURL(response);

          if (!res.headers || response.type === 'application/json; charset=utf-8') {
            return;
          }

          setImages((prevImages) => [
            ...prevImages,
            {
              imageURL,
              name: res.headers.get("originalname"),
              dimensions: res.headers.get("dimensions"),
              size: res.headers.get("filesize"),
              nameinserver: res.headers.get("nameinserver"),
              isfavorited: res.headers.get('isfavorited') === '1',
              value: images.length,
              focused: false,
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
  }, [currentIndex, setCurrentIndex, images.length, page, resetNumber]);

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
        page={page}
      />
    </div>
  );
}

export default Gallery;
