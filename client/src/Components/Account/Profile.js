import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    storageused: 0,
    numberofimages: 0,
    averagesize: 0,
  });

  function shortenSizeWord(value) {
    let data = value;

    if (data < 1000000) {
      data = data / 1000
      data = data.toString().slice(0, 5);
      return data += "KB";
    } else if (1000000 <= data && data < 950000000) {
      data = data / 1000000
      data = data.toString().slice(0, 5);
      return data += "MB";
    } else if (950000000 <= data) {
      data = data / 1000000000
      data = data.toString().slice(0, 5);
      return data += "GB";
    }
  }

  useEffect(() => {
    axios
      .post("http://localhost:5000/profile", {
        token: sessionStorage.getItem("token"),
      })
      .then((res) => {
        if (res.data[0] === undefined) {
          return navigate("/login");
        }
        setUserInfo({
          username: res.data[0].username,
          email: res.data[0].email,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("http://localhost:5000/profile/getinfo", {
        token: sessionStorage.getItem("token"),
      })
      .then((res) => {
        let overall = shortenSizeWord(res.data.dataConsumed);
        let average = shortenSizeWord(res.data.averagesize);
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          storageused: overall,
          numberofimages: res.data.amountofphotos,
          averagesize: average,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page">
      <h1 className="profile--user-info">Username: {userInfo.username}</h1>
      <h1 className="profile--user-info">Email: {userInfo.email}</h1>
      <p>
        You have {userInfo.numberofimages} images stored, a total of{" "}
        {userInfo.storageused} used, with an average image size of{" "}
        {userInfo.averagesize} ,{" "}
      </p>
      <button
        onClick={() => {
          navigate("/gallery");
        }}
      >
        View My Photos
      </button>
    </div>
  );
}

export default Profile;
