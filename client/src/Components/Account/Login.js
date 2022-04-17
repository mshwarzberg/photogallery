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
  
  function setUserSession(token) {
    sessionStorage.setItem("token", token);
  }

  function loginUser(e) {
    e.preventDefault();

    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInput),
    };

    fetch("/api/login", fetchOptions)
      .then(async (res) => {
        const { msg, token, err } = await res.json();

        if (err === "User not found") {
          return setMessage("User does not exist");
        }
        if (err === "Incorrect password") {
          return setMessage("Incorrect password. Please try again.");
        }
        if (msg === "MMHURaqxrhtyJR0uauiyXWenHOPyxQPyk9fr6z4hO2sUgtHXrv") {
          setUserSession(token);
          navigate("/profile");
        }
      })
      .catch((err) => {
        return console.log(err);
      });
  }

  return (
    <div className="page" id="login--page">
      <div className="login--block">
        {message ? (
          <h1 className="userform--error">{message}</h1>
        ) : (
          <h1 className="userform--title">Login</h1>
        )}
        <form onSubmit={loginUser} className="userform--form">
          <label htmlFor="userform--username">
            Enter your username or email:
          </label>
          <div className="userform--input-innerdiv">
            <input
              type="text"
              id="userform--username"
              className="userform--input"
              onChange={loginInputChange}
              name="username"
              value={loginInput.username}
              placeholder="Username or email"
            />
            <input
              type="button"
              value="?"
              onMouseEnter={() => {
                // hideShowTooltip("passwordmsg", true);
              }}
              onMouseLeave={() => {
                // hideShowTooltip("passwordmsg", false);
              }}
              id={
                !loginInput.username
                  ? "userform--input-tooltip-notallowed"
                  : "userform--input-tooltip-allowed"
              }
              className="userform--input-tooltip"
            />
          </div>
          <label htmlFor="userform--password">Enter your password: </label>
          <div className="userform--input-innerdiv">
            <input
              type="password"
              id="userform--password"
              className="userform--input"
              onChange={loginInputChange}
              name="password"
              value={loginInput.password}
              placeholder="Password"
            />
            <input
            type="button"
            value="?"
            onMouseEnter={() => {
              // hideShowTooltip("passwordmsg", true);
            }}
            onMouseLeave={() => {
              // hideShowTooltip("passwordmsg", false);
            }}
            id={
              !loginInput.password
                ? "userform--input-tooltip-notallowed"
                : "userform--input-tooltip-allowed"
            }
            className="userform--input-tooltip"
          />
          </div>
          
          <button
            type="submit"
            id="userform--submit"
            onClick={loginUser}
            disabled={!loginInput.username || !loginInput.password}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
