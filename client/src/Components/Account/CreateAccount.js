import React, { useState } from "react";

function CreateAccount() {
  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  function registerUser(e) {
    e.preventDefault();
    console.log(registerInput);
  }

  function changeRegisterInput(e) {
    const { name, value, type } = e.target;
    setRegisterInput((prevRegisterInput) => ({
      ...prevRegisterInput,
      [name]: value,
    }));
  }
  
  return (
    <div className="register--block">
      <h1 className="register--title">Create Account</h1>
      <form onSubmit={registerUser} className="register--form">
        <label htmlFor="register--username">Enter a new username:</label>
        <input
          onChange={changeRegisterInput}
          name="username"
          type="text"
          placeholder="Username"
          id="register--username"
          required
        />
        <label htmlFor="register--email">Enter your email:</label>
        <input
          onChange={changeRegisterInput}
          name="email"
          type="email"
          placeholder="Email"
          id="register--email"
          required
        />
        <label htmlFor="register--password">Create secure password:</label>
        <input
          onChange={changeRegisterInput}
          name="password"
          type="password"
          placeholder="Password"
          id="register--password"
          required
        />
        <button type="submit" onClick={registerUser}>
          Register
        </button>
      </form>
    </div>
  );
}

export default CreateAccount;
