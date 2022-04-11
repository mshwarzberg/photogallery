import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewPhotos() {
  const [images, setImages] = useState([]);
  const [APIcalls, setAPIcalls] = useState(0);

  useEffect(() => {

    (async () => {
      await axios
        .post("http://localhost:5000/gallery/getid", {
          id: sessionStorage.getItem("token"),
          reqNum: APIcalls,
        })
        .then((res) => {
          return
        });
      axios
        .get("http://localhost:5000/gallery", { responseType: "blob" })
        .then((res) => {
          var imageURL = URL.createObjectURL(res.data);
          setImages((prevImages) => [...prevImages, { imageURL }]);
          setAPIcalls(APIcalls + 1);
        });
    })();

  }, [APIcalls, setAPIcalls]);

  const renderImages = images.map((image) => (
    <img
      className="viewphotos--image"
      alt="myimg"
      src={image.imageURL}
      key={image.imageURL}
    />
  ));

  return (
    <div className="page" id="viewphotos--page">
      <div id="viewphotos--grid">
        {renderImages}
      </div>
    </div>
  );
}

export default ViewPhotos;
