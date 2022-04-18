import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateAccount from "./Components/Account/CreateAccount";
import Profile from "./Components/Account/Profile";
import Login from "./Components/Account/Login";
import Home from "./Components/General/Home";
import Navbar from "./Components/General/Navbar";
import Upload from "./Components/Gallery/Upload";
import ViewGallery from "./Components/Gallery/ViewGallery";
import Privacy from "./Components/General/Privacy";
import Footer from "./Components/General/Footer";

import AuthContext from "./Context/AuthContext";

function App() {
  const { fetch: originalFetch } = window
  

  const [checkAuth, setCheckAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  const authValue = { checkAuth, setCheckAuth };

  return (
    <AuthContext.Provider value={authValue}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Privacy />} path="/yourprivacy" />
            <Route element={<CreateAccount />} path="/register" />
            <Route element={<Login />} path="/login" />
            <Route element={<ViewGallery />} path="/gallery" />
            <Route element={<Upload />} path="/upload" />
            <Route element={<Profile />} path="/profile" />
          </Routes>
          <Footer />
        </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
