import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";

import './index.css'
import './fonts/fonts.css'

import "./Components/General/general-css/navbar.css";
import './Components/General/general-css/home.css'
import "./Components/Account/account-css/profile.css";
import "./Components/Account/account-css/createaccount.css";
import "./Components/Account/account-css/login.css";
import './Components/Account/account-css/upload.css'
import './Components/Account/account-css/userform.css'
import './Components/Gallery/gallery-css/rendergallerypage.css'
import './Components/Gallery/gallery-css/focusonimage.css'
import './Components/Gallery/gallery-css/renderimage.css'
import './Components/General/general-css/footer.css'
import './Components/Gallery/gallery-css/hoverbuttons.css'

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(<App tab="home" />);
