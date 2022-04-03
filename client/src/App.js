import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from "./Components/Account/CreateAccount";
import Profile from "./Components/Account/Profile";
import Login from "./Components/Account/Login";
import Home from "./Components/General/Home";
import Navbar from "./Components/General/Navbar";

export const UserAuth = createContext();

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <UserAuth.Provider value={{ isAuth, setIsAuth }}>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<CreateAccount />} path="/register" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<Login />} path="/login" />
        </Routes>
      </BrowserRouter>
    </UserAuth.Provider>
  );
}

export default App;
