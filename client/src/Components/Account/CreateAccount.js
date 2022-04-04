import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function CreateAccount() {

  const navigate = useNavigate()

  const [allowedToSubmit, setAllowedToSubmit] = useState(true);
  const [errMessage, setErrMessage] = useState('')
  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  function validateInp() {
    const username = registerInput.username;
    const email = registerInput.email;
    const password = registerInput.password;

    if (username.length < 3 || email.length < 5 || password.length < 6) {
      return setAllowedToSubmit(true);
    }
    if (username.length > 50 || email.length > 50 || password.length > 50) {
      return setAllowedToSubmit(true);
    }
    // I stole this regex. Not sure who wrote it.
    if (
      !email.match(
        /^[a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]{0,1}([a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-.]{0,1}([a-zA-Z][-.]{0,1})*[a-zA-Z0-9].[a-zA-Z0-9]{1,}([.-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
      )
    ) {
      return setAllowedToSubmit(true);
    }
    return;
  }

  function registerUser(e) {
    e.preventDefault();
    validateInp(
      registerInput.username,
      registerInput.email,
      registerInput.password
    );
    if (!allowedToSubmit.notallowed) {
      axios
        .post("http://localhost:5000/register", registerInput)
        .then((res) => {
          if (res.data === 'duplicate found') {
            return setErrMessage('Username or email already exists')
          }
        })
        .catch((err) => {
          console.log(err);
        });
      navigate('/login')
    }
  }

  function changeRegisterInput(e) {
    const { name, value } = e.target;
    setRegisterInput((prevRegisterInput) => ({
      ...prevRegisterInput,
      [name]: value,
    }));

    setAllowedToSubmit(false);
    validateInp(name);
  }

  return (
    <div className="register--parent">
      <div className="register--block">
        {errMessage ? (
          <h1 className="register--error">{errMessage}</h1>
        ) : (
          <h1 className="register--title">Create Account</h1>
        )}
        <form onSubmit={registerUser} className="register--form">
          <label htmlFor="register--username">Enter a new username:</label>
          <input
            onChange={changeRegisterInput}
            name="username"
            type="text"
            placeholder="Username"
            id="register--username"
            className="register--input"
            required
          />
          <label htmlFor="register--email">Enter your email:</label>
          <input
            onChange={changeRegisterInput}
            name="email"
            type="email"
            placeholder="Email"
            id="register--email"
            className="register--input"
            required
          />
          <label htmlFor="register--password">Create secure password:</label>
          <input
            onChange={changeRegisterInput}
            name="password"
            type="password"
            placeholder="Password"
            id="register--password"
            className="register--input"
            required
          />
          <button
            type="submit"
            onClick={registerUser}
            id="register--submit"
            disabled={allowedToSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
