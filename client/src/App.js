import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from "./Components/Account/CreateAccount";
import Profile from "./Components/Account/Profile";
import Login from "./Components/Account/Login";
import Home from "./Components/General/Home";
import Navbar from "./Components/General/Navbar";
import Upload from "./Components/Gallery/Upload";
import ViewGallery from "./Components/Gallery/ViewGallery";

function App() {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
