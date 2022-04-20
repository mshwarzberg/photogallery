import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import homepageIcon from "../../images/homepageicon.png";
import AuthContext from "../../Context/AuthContext";

function Navbar(props) {
  const { showNav, setShowNav } = props
  
  const navigate = useNavigate();

  const { checkAuth } = useContext(AuthContext);

  return (
    <nav id={showNav ? "navbar--visible" : "navbar--hidden"}>
      {showNav && (
        <div id="navbar--top">
          <button
            onClick={() => {
              navigate("/");
            }}
            id="navbar--home-link"
            className="navbar--links"
          >
            <img id="navbar--home-icon" src={homepageIcon} alt="" />
            <p id="navbar--home-text">HOME</p>
          </button>
          {!checkAuth ? (
            <button
              onClick={() => {
                navigate("/login");
              }}
              id="nav--login-link"
              className="navbar--links"
            >
              LOGIN
            </button>
          ) : (
            <div id="navbar--top">
              <button
                onClick={() => {
                  fetch("auth/logout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: localStorage.getItem("id"), loggingout: true }),
                  })
                    .then(async (res) => {
                      const response = await res.json();
                      if (
                        (response.res =
                          "RHKp946ZyBp2g6XNj45BKn7tF58syiFVvCx3wSdONwT6J4IdJU")
                      ) {
                        localStorage.clear();
                        navigate("/");
                        return window.location.reload(true);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                className="navbar--links"
                id="nav--logout-link"
              >
                LOGOUT
              </button>
              <button
                onClick={() => {
                  navigate("/upload");
                }}
                id="nav--upload-link"
                className="navbar--links"
              >
                UPLOAD
              </button>
              <button
                onClick={() => {
                  navigate("/profile");
                }}
                id="nav--profile-link"
                className="navbar--links"
              >
                PROFILE
              </button>
            </div>
          )}
        </div>
      )}
      <div
        id="navbar--bottom"
        onClick={() => {
          setShowNav(!showNav);
        }}
      >
        <button
          title="Show/Hide navigation bar"
          id={showNav ? "navbar--toggle-visible" : "navbar--toggle-hidden"}
        >
          {showNav ? (
            <p id="navbar--toggle-arrow-visible">↑</p>
          ) : (
            <p id="navbar--toggle-arrow-hidden">↓</p>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
