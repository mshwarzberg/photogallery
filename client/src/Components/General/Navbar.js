import React, { useState } from "react";

function Navbar() {
  const [showNav, setShowNav] = useState(true);

  return (
    <nav className={showNav ? "navbar--visible" : "navbar--hidden"}>
      <div className="navbar--top">
        <a href="/" id="nav--home-link" className="navbar--links">
          Home
        </a>
        <a href="/login" id="nav--login-link" className="navbar--links">
          Login
        </a>
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
