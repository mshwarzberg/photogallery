import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);

  function logOut() {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className={showNav ? "navbar--visible" : "navbar--hidden"}>
      <div className="navbar--top">
        <a href="/" id="nav--home-link" className="navbar--links">
          Home
        </a>
        <a href="/login" id="nav--login-link" className="navbar--links">
          Login
        </a>
        <button
          onClick={logOut}
          className="navbar--links"
          id="nav--logout-link"
        >
          Logout
        </button>
        <a href="/register" id="nav--register-link" className="navbar--links">
          Register
        </a>
        <a href="/profile" id="nav--profile-link" className="navbar--links">
          Profile
        </a>
      </div>
      <div className="navbar--bottom">
        <button
          onClick={() => {
            setShowNav(!showNav);
          }}
          title="Show/Hide Navbar"
          id="navbar--show-hide"
        >
          {showNav ? "↑" : "↓"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
