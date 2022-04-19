import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingIcon from "../../images/loading.gif";

function Upload() {

  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [filesNotReady, setFilesNotReady] = useState(true);
  const [files, setFiles] = useState();

  useEffect(() => {
    (() => {
      if (files && files.length > 100) {
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
    if (!localStorage.getItem("id")) {
      return navigate("/");
    }

    const formData = new FormData();

    fetch("/api/upload/getid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: localStorage.getItem("id") }),
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
        <label id="upload--choose-button" htmlFor="upload--choose-one" className="upload--choose-button">
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
        {!files ? '' : <p id="upload--number-of-files">You have {files[0] ? `${files.length} images` : 'one image'}   ready to upload</p>}
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
        <div id="upload--loading">
          <h1 id="upload--loading-text">
            Image(s) are uploading. Please be patient...
          </h1>
          <img id="upload--spinner" src={loadingIcon} alt="loading" />
        </div>
      )}
    </div>
  );
}

export default Upload;
