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
      data /= 1000;
      data = data.toString().slice(0, 5);
      return (data += "KB");
    } else if (1000000 <= data && data < 950000000) {
      data /= 1000000;
      data = data.toString().slice(0, 5);
      return (data += "MB");
    } else if (950000000 <= data) {
      data /= 1000000000;
      data = data.toString().slice(0, 5);
      return (data += "GB");
    }
  }

  useEffect(() => {
    fetch("/api/profile/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: sessionStorage.getItem("token"),
      }),
    })
      .then(async (res) => {
        const response = await res.json();
          let overall = shortenSizeWord(response.data.username);
          let average = shortenSizeWord(response.data.email);
          setUserInfo((prevInfo) => ({
            ...prevInfo,
            username: overall,
            email: average
          }));
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("/api/profile/getinfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: sessionStorage.getItem("token"),
      }),
    })
      .then(async (res) => {
        const response = await res.json();
          let overall = shortenSizeWord(response.dataConsumed);
          let average = shortenSizeWord(response.averagesize);
          setUserInfo((prevInfo) => ({
            ...prevInfo,
            storageused: overall,
            numberofimages: response.amountofphotos,
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
        {userInfo.averagesize}.
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
