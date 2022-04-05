import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    function checkAuth() {
      if (sessionStorage.getItem('token') !== null) {
        console.log('changed to true');
        setIsLoggedIn(true)
      }
    }

    return checkAuth()
  }, [])

  function logOut() {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false)
    navigate("/");
  }

  return (
    <nav className={showNav ? "navbar--visible" : "navbar--hidden"}>
      <div className="navbar--top">
        <a href="/" id="nav--home-link" className="navbar--links">
          Home
        </a>
        {!isLoggedIn ? <a href="/login" id="nav--login-link" className="navbar--links">
          Login
        </a> :
        <div><button
          onClick={logOut}
          className="navbar--links"
          id="nav--logout-link"
        >
          Logout
        </button><a href="/upload" id="nav--upload-link" className="navbar--links">
        Upload
      </a></div>}
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
