import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingIcon from "../../images/Loading.gif";

function Upload() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [filesNotReady, setFilesNotReady] = useState(true);
  const [files, setFiles] = useState();

  useEffect(() => {
    (() => {
      if (files && files.length > 10) {
        console.log('test');
        setFilesNotReady(true);
        setFiles();
        setMessage("Too many files selected. You may choose up to 10 images");
        return setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    })()
  }, [files, setFiles])
  
  function selectImage(e) {
    setFiles(e.target.files[0]);
    setFilesNotReady(false);
  }

  function selectImages(e) {
    setFiles(() => {
      let imgArr = [];
      for (let i = 0; i < e.target.files.length; i++) {
        imgArr.push(e.target.files[i]);
      }
      return imgArr;
    })
    return setFilesNotReady(false);
  }

  function uploadFiles() {
    if (!sessionStorage.getItem("token")) {
      return navigate("/");
    }

    const formData = new FormData();

    fetch("/api/upload/getid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: sessionStorage.getItem("token") }),
    })
      .then(async (res) => {
        const response = await res.json();
        if (response === false) {
          setMessage("Invalid user. Please login to upload");
          return setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(true);
    setFilesNotReady(true);

    if (files.length === undefined) {
      setFiles();
      formData.append("image", files);
      fetch("/api/upload/one", {
        method: "POST",
        body: formData,
      })
        .then(async (res) => {
          await res.json();
          setMessage("Image successfully uploaded! (Click to view)");
          setTimeout(() => {
            setMessage("");
          }, 5000);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }
      fetch("/api/upload/multiple", {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        await res.json();
        setMessage("Images successfully uploaded! (Click to view)");
        setTimeout(() => {
          setMessage("");
        }, 5000);
        setIsLoading(false);
      });
    }
  }

  return (
    <div className="page" id="upload--page">
      <div className="upload--choose-files">
        <label className="upload--choose-button" htmlFor="upload--choose-one">
          Choose An Image
        </label>
        <input
          onChange={selectImage}
          id="upload--choose-one"
          accept="image/*"
          type="file"
          style={{ visibility: "hidden" }}
        />

        <label
          className="upload--choose-button"
          htmlFor="upload--choose-multiple"
          title="You can choose up to 10 images"
        >
          Choose Multiple Images
        </label>
        <input
          multiple
          onChange={selectImages}
          id="upload--choose-multiple"
          accept="image/*"
          type="file"
          style={{ visibility: "hidden" }}
        />
      </div>
      <button
        id="upload--upload-button"
        type="submit"
        onClick={uploadFiles}
        disabled={filesNotReady}
      >
        Upload Your Files
      </button>
      {message && (
        <h3
          id="upload--message"
          onClick={() => {
            navigate("/gallery");
          }}
        >
          {message}
        </h3>
      )}
      {isLoading && (
        <div className="upload--loading">
          <h1 className="upload--loading-text">
            {!filesNotReady && files.length === undefined ? 'Image is' : 'Images are'} uploading. Please be patient...
          </h1>
          <img className="upload--spinner" src={loadingIcon} alt="loading" />
        </div>
      )}
    </div>
  );
}

export default Upload;
