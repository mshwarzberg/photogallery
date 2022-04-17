import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";

import "./Components/General/general-css/navbar.css";
import "./Components/General/general-css/index.css";
import './Components/General/general-css/home.css'
import "./Components/Account/account-css/profile.css";
import "./Components/Account/account-css/createaccount.css";
import "./Components/Account/account-css/login.css";
import './Components/Gallery/gallery-css/upload.css'
import './Components/Gallery/gallery-css/viewgallery.css'
import './Components/Gallery/gallery-css/focusonimage.css'
import './Components/Gallery/gallery-css/renderimage.css'
import './Components/General/general-css/footer.css'
import './Components/Account/account-css/userform.css'

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(<App tab="home" />);
