import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

  function loginInputChange(e) {
    const { name, value } = e.target;
    setLoginInput((prevLoginInput) => ({
      ...prevLoginInput,
      [name]: value,
    }));
  }

  function setUserSession(isAuth, token) {
    sessionStorage.setItem("token", token);
  }

  function loginUser(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", loginInput)
      .then((res) => {
        if (
          res.data.msg === "user not found" ||
          res.data.msg === "incorrect password"
        ) {
          setMessage(res.data.msg);
          return console.log(res.data.msg);
        }
        setUserSession(true, res.data.token);
        navigate("/profile");
      })
      .catch((err) => {
        return console.log(err);
      });
  }

  return (
    <div className="login--parent">
      <div className="login--block">
        {message ? (
          <h1 className="login--error">{message}</h1>
        ) : (
          <h1 className="login--title">Login</h1>
        )}
        <form onSubmit={loginUser} className="login--form">
          <label htmlFor="login--username">Enter your username: </label>
          <input
            type="text"
            id="login--username"
            className="login--input"
            onChange={loginInputChange}
            name="username"
            value={loginInput.username}
          />
          <label htmlFor="login--password">Enter your password: </label>
          <input
            type="password"
            id="login--password"
            className="login--input"
            onChange={loginInputChange}
            name="password"
            value={loginInput.password}
          />
          <button type="submit" id="login--submit" onClick={loginUser}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
