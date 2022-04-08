import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Upload() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [filesNotReady, setFilesNotReady] = useState(true);
  const [file, setFiles] = useState();

  function selectImage(e) {
    setFiles(e.target.files[0]);
    setFilesNotReady(false);
  }

  function selectImages() {
    console.log("images");
  }

  function uploadFiles() {
    if (!sessionStorage.getItem('token')) {
      return navigate('/')
    }
    const formData = new FormData();
    formData.append("image", file);
    axios.post("http://localhost:5000/upload/getid", {id: sessionStorage.getItem('token')})
    axios.post("http://localhost:5000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setMessage('Image successfully uploaded!')
    setFiles()
    setFilesNotReady(true)
  }

  return (
    <div className="upload--page">
      <div className="upload--choose-files">
        <label className="upload--choose-button" htmlFor="upload--choose-one">
          Choose One Image
        </label>
        <input
          style={{ visibility: "hidden" }}
          onChange={selectImage}
          id="upload--choose-one"
          type="file"
          accept="image/*"
        />

        <label
          className="upload--choose-button"
          htmlFor="upload--choose-multiple"
        >
          Choose Multiple Images
        </label>
        <input
          disabled={true}
          multiple
          style={{ visibility: "hidden" }}
          onChange={selectImages}
          id="upload--choose-multiple"
          type="file"
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
      {message && <h3 id="upload--message">{message}</h3>}
    </div>
  );
}

export default Upload;
