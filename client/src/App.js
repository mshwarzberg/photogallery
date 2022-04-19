import React, { useState } from "react";
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
  const [showNav, setShowNav] = useState(false);

  function myTokens() {
    console.log("tokening");
    // fetch("/auth/verify", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: localStorage.getItem("accessToken"),
    //   },
    //   body: JSON.stringify({checkingtoken: true, loggingout: false, refreshingtoken: false})
    // })
    //   .then(async (res) => {
    //     const response = await res.json();
    //     if (response.err) {
    //       console.log(response.err);
    //       fetch("/auth/newtoken", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           authorization: localStorage.getItem("accessToken"),
    //         },
    //         body: JSON.stringify({id: localStorage.getItem('id'), checkingtoken: false, loggingout: false, refreshingtoken: true})
    //       }).then(async (res) =>  {
    //         const response = await res.json()
    //         localStorage.setItem('accessToken', response.accessToken)
    //         console.log('jklsfadkjldsfakjl;');
    //       }).catch(err => {
    //         console.log(err);
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  const [checkAuth, setCheckAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  const authValue = { checkAuth, setCheckAuth };

  return (
    <AuthContext.Provider value={authValue}>
      <BrowserRouter>
        <Navbar showNav={showNav} setShowNav={setShowNav} />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Privacy />} path="/yourprivacy" />
          <Route element={<CreateAccount />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route
            element={
              <ViewGallery
                myTokens={myTokens}
                showNav={showNav}
                setShowNav={setShowNav}
              />
            }
            path="/gallery"
          />
          <Route element={<Upload myTokens={myTokens} />} path="/upload" />
          <Route element={<Profile myTokens={myTokens} />} path="/profile" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
