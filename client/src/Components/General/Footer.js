import React from "react";
import { useNavigate } from 'react-router-dom'

function Footer(props) {
  const navigate = useNavigate()
  return (
    <div>
     
        <div  id={props.scrollDir === "scrolling up" ? "footer--page-shown" : "footer--page-hidden"}>
          <button onClick={() => {
            navigate('/aboutthecreator')
          }}>About</button>
          <button onClick={() => {
            navigate('/yourprivacy')
          }}>Privacy</button>
        </div>
    </div>
  );
}

export default Footer;
