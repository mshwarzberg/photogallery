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

  function loginUser(e) {
    e.preventDefault();

    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInput),
    })
      .then(async (res) => {
        const response = await res.json();

        if (response.err) {
          if (response.err === "User not found"){
          return setMessage("User does not exist")}
          return setMessage("Incorrect password. Please try again.");
        }
        if (response.err === "Incorrect password") {
          
        }
        if (response.msg === "MMHURaqxrhtyJR0uauiyXWenHOPyxQPyk9fr6z4hO2sUgtHXrv") {
          localStorage.setItem("isAuth", true);
          localStorage.setItem("id", response.id);
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          localStorage.setItem("expiresIn", response.expiresIn)
          navigate("/profile");
          return window.location.reload(true);
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
          <h1 className="userform--title" id="userform--title-error">
            {message}
          </h1>
        ) : (
          <h1 className="userform--title">Log In</h1>
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
                loginInput.username.length < 4
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
                loginInput.password.length < 5
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
            disabled={loginInput.username.length < 4  || loginInput.password.length < 5}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
