import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingIcon from '../../images/Loading.gif'

function Upload() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("");
  const [filesNotReady, setFilesNotReady] = useState(true);
  const [files, setFiles] = useState();

  function selectImage(e) {
    setFiles(e.target.files[0]);
    setFilesNotReady(false);
  }

  function selectImages(e) {
    setFiles(() => {
      let imgArr = []
      for (let i = 0; i < e.target.files.length; i++) {
        imgArr.push(e.target.files[i])
      }
      return imgArr
    })
    setFilesNotReady(false)
  }

  function uploadFiles() {
    if (!sessionStorage.getItem("token")) {
      return navigate("/");
    }

    const formData = new FormData();

    axios
      .post("http://localhost:5000/upload/getid", {
        id: sessionStorage.getItem("token"),
      })
      .then((res) => {
        if (res.data === false) {
          setMessage("Invalid user. Please login to upload");
          return setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      });

    setIsLoading(true)
    setFilesNotReady(true);
    
    if (files.length === undefined) {
      setFiles();
      formData.append("image", files);
      axios
      .post("http://localhost:5000/upload/one", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(async (res) => {
        await res.data
        setMessage("Image successfully uploaded! (Click to view)");
        setTimeout(() => {
          setMessage("");
        }, 5000);
        setIsLoading(false)
      });
    }
    else {
      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i])
      }
      axios
      .post("http://localhost:5000/upload/multiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(async (res) => {
        console.log(res.data);
        await res.data
        setMessage("Images successfully uploaded! (Click to view)");
        setTimeout(() => {
          setMessage("");
        }, 5000);
        setIsLoading(false)
      });
    }
  }

  return (
    <div className="page">
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
      {isLoading && <div className="upload--loading"><h1 className="upload--loading-text">Image is uploading. Please be patient...</h1><img className="upload--spinner" src={loadingIcon} alt="loading"/></div>}
    </div>
  );
}

export default Upload;
