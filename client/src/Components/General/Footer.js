import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

function Footer() {

  const navigate = useNavigate();

  const [isScrolling, setIsScrolling] = useState(false)

  window.onscroll = function() {  
    setIsScrolling(true)
    const scrollTimer = setTimeout(() => {
      setIsScrolling(false)
    }, 2000);
    if (isScrolling) {
      clearTimeout(scrollTimer)
    }
  } 

  return (
    <div className="page">
        <div id={isScrolling ? "footer--page-hidden" :"footer--page-shown"}>
        <div id="footer--top-empty" onClick={() => {
          setIsScrolling(!isScrolling)
        }}>
              
        </div>
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
          <p className={isScrolling ? "footer--buttons-hidden": "footer--buttons-shown"} id="footer--copyright">&copy;2022</p>
        </div>
    </div>
  );
}

export default Footer;
