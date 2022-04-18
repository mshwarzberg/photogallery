import React, { useEffect, useState } from "react";
import ViewFocus from "./FocusOnImage";
import RenderImage from "./RenderImage";

function ViewGallery() {

  const [currentAPIcalls, setCurrentAPIcalls] = useState(1);
  const [images, setImages] = useState([]);
  const [totalAPIcalls, setTotalAPIcalls] = useState([0]);
  const [totalChunkCalls, setTotalChunkCalls] = useState(1);

  const [imageData, setImageData] = useState([
    {
      imageid: "",
      name: "",
      dimensions: "",
      filesize: 0,
    },
  ]);

  useEffect(() => {
    setImageData((prevImageData) => {
      prevImageData = prevImageData.splice(1, prevImageData.length - 1);
      return prevImageData;
    });
  }, []);

  useEffect(() => {
    function getImageData() {
      if (currentAPIcalls < 25 && totalAPIcalls) {
        fetch("api/gallery/getid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: localStorage.getItem("id"),
            currentcalls: currentAPIcalls,
            totalcalls: totalChunkCalls - 1,
          }),
        })
          .then(async (res) => {
            const response = await res.json();
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
                value: totalAPIcalls[totalAPIcalls.length - 1],
                imageid: response.imageid,
                name: response.name,
                servername: response.servername,
                dimensions: response.dimensions,
                filesize: response.filesize,
              },
            ]);
          })
          .catch((err) => {
            console.error("API POST ERROR", err);
            return setCurrentAPIcalls(1000);
          });

        fetch("api/gallery", {
          method: "GET",
        })
          .then(async (res) => {
            const response = await res.blob();
            const imageURL = URL.createObjectURL(response);
            setImages((prevImages) => [
              ...prevImages,
              { imageURL, value: totalAPIcalls[totalAPIcalls.length - 1] },
            ]);
            setCurrentAPIcalls(
              (prevCurrentAPIcalls) => prevCurrentAPIcalls + 1
            );
            setTotalAPIcalls((prevTotalAPIcalls) => [
              ...prevTotalAPIcalls,
              prevTotalAPIcalls[prevTotalAPIcalls.length - 1] + 1,
            ]);
          })
          .catch((err) => {
            console.log("API GET ERROR", err);
            return;
          });
          window.onscroll = function () {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
              if (totalAPIcalls.length / totalChunkCalls === 25 && currentAPIcalls === 25) {
                setTotalChunkCalls((prevChunkTotal) => prevChunkTotal + 1);
              }
              setCurrentAPIcalls(0);
            }
          };
      }

    }
    getImageData();
  }, [
    currentAPIcalls,
    setCurrentAPIcalls,
    totalAPIcalls,
    setTotalAPIcalls,
    totalChunkCalls,
  ]);

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

  return (
    <div className="page" id="viewgallery--page">
      <h1 id="viewgallery--header">{images.length} images loaded</h1>
      <RenderImage
        images={images}
        imageData={imageData}
        setImageData={setImageData}
        focusOnImage={focusOnImage}
        setImages={setImages}
        getImageSize={getImageSize}
        setTotalAPIcalls={setTotalAPIcalls}
      />
      <ViewFocus
        images={images}
        imageData={imageData}
        focusOnImage={focusOnImage}
        getImageSize={getImageSize}
      />
    </div>
  );
}

export default ViewGallery;
