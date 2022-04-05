import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { CookiesProvider } from "react-cookie";

import "./Components/General/general-css/navbar.css";
import "./Components/General/general-css/index.css";
import "./Components/Account/account-css/profile.css";
import "./Components/Account/account-css/register.css";
import "./Components/Account/account-css/login.css";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(
  <CookiesProvider>
    <App tab="home" />
  </CookiesProvider>
);
