import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

function Footer() {

  const navigate = useNavigate();

  const [isScrolling, setIsScrolling] = useState(false)

  window.onscroll = function(e) {  
    setIsScrolling(true)
    const scrollTimer = setTimeout(() => {
      setIsScrolling(false)
    }, 2000);
    if (isScrolling) {
      clearTimeout(scrollTimer)
    }
  } 

  return (
    <div>
        <div id={isScrolling ? "footer--page-hidden" :"footer--page-shown"}>
          <button
            className={isScrolling ? "footer--buttons-hidden": "footer--buttons-shown"}
            onClick={() => {
              navigate("/aboutthecreator");
            }}
          >
            About
          </button>
          <button
            className={isScrolling ? "footer--buttons-hidden": "footer--buttons-shown"}
            onClick={() => {
              navigate("/yourprivacy");
            }}
          >
            Privacy
          </button>
          <a
            className={isScrolling ? "footer--buttons-hidden": "footer--buttons-shown"}
            href="https://github.com/mshwarzberg"
            target='about:blank'
            style={{textDecoration: 'none'}}
          >
            GITHUB
          </a>
        </div>
    </div>
  );
}

export default Footer;
