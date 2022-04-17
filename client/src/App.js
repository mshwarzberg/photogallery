import React, { useState, useEffect } from "react";

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

function App() {
  const [scrollDir, setScrollDir] = useState();

  useEffect(() => {

    const threshold = 400;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {

      const scrollY = window.pageYOffset;

      setTimeout(() => {
        lastScrollY = 0
      }, 1000);

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        clearTimeout()
          window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ViewGallery />} path="/gallery" />
        <Route element={<Upload />} path="/upload" />
        <Route element={<Home />} path="/" />
        <Route element={<CreateAccount />} path="/register" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<Login />} path="/login" />
        <Route element={<Privacy />} path="/yourprivacy"/>
      </Routes>
      <Footer scrollDir={scrollDir}/>
    </BrowserRouter>
  );
}

export default App;
