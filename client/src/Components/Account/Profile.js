import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const navigate = useNavigate();
  const { myTokens } = props
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    storageused: 0,
    numberofimages: 0,
    averagesize: 0,
  });

  useEffect(() => {
    myTokens()
    return myTokens()
  }, [myTokens])

  useEffect(() => {
      fetch("/api/profile/getinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("id"),
        }),
      }).then(async (res) => {
        const response = await res.json();
        
        if (response.err) {
          return fetch("/auth/newtoken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }).then(async (res) => {

            const response = await res.json();

            if (response.err) {
              console.log(response.err);
            }
          }).catch((err) => console.log(err));
        }
        let overall = shortenSizeWord(response.totaldataconsumed);
        let average = shortenSizeWord(response.averagesize);
        setUserInfo({
          storageused: overall,
          numberofimages: response.amountofphotos,
          averagesize: average,
          username: response.username,
          email: response.email,
        });
    })
  }, [navigate, props]);

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
