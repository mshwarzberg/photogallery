import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function authUser() {
      if (sessionStorage.getItem("token") !== null) {
        setIsLoggedIn(true);
      }
    }
    return authUser();
  });

  return (
    <nav className={showNav ? "navbar--visible" : "navbar--hidden"}>
      <div className="navbar--top">
        {/* <a
          id="nav--home-link"
          className="navbar--links"
          onClick={() => {
            fetch("/api/magical", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: sessionStorage.getItem("token") }),
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Magical Button
        </a> */}
        <a href="/" id="nav--home-link" className="navbar--links">
          Home
        </a>
        {!isLoggedIn ? (
          <a href="/login" id="nav--login-link" className="navbar--links">
            Login
          </a>
        ) : (
          <div>
            <button
              onClick={() => {
                sessionStorage.removeItem("token");
                setIsLoggedIn(false);
                navigate("/");
              }}
              className="navbar--links"
              id="nav--logout-link"
            >
              Logout
            </button>
            <a href="/upload" id="nav--upload-link" className="navbar--links">
              Upload
            </a>
            <a href="/profile" id="nav--profile-link" className="navbar--links">
              Profile
            </a>
          </div>
        )}
      </div>
      <div className="navbar--bottom">
        <button
          onClick={() => {
            setShowNav(!showNav);
          }}
          title="Show/Hide navigation bar"
          id="navbar--show-hide"
        >
          {showNav ? "↑" : "↓"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
