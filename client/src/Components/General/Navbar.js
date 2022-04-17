import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import homepageIcon from '../../images/homepageicon.png'

function Navbar() {
  const navigate = useNavigate();

  const [showNav, setShowNav] = useState(false);
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
    <nav id={showNav ? "navbar--visible" : "navbar--hidden"}>
      {showNav && <div id="navbar--top">
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
        
        <button
          onClick={() => {
            navigate("/");
          }}
          id="navbar--home-link"
          className="navbar--links"
        >
         <img id="navbar--home-icon" src={homepageIcon} alt="" /> Home 
        </button>
        {!isLoggedIn ? (
          <button
            onClick={() => {
              navigate("/login");
            }}
            id="nav--login-link"
            className="navbar--links"
          >
            Login
          </button>
        ) : (
          <div id="navbar--top">
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
            <button
              onClick={() => {
                navigate("/upload");
              }}
              id="nav--upload-link"
              className="navbar--links"
            >
              Upload
            </button>
            <button
              onClick={() => {
                navigate("/profile");
              }}
              id="nav--profile-link"
              className="navbar--links"
            >
              Profile
            </button>
          </div>
        )}
      </div>}
      <div id="navbar--bottom">
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
