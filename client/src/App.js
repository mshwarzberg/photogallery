import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";

import CreateAccount from "./Components/Account/CreateAccount";
import Profile from "./Components/Account/Profile";
import Login from "./Components/Account/Login";
import Home from "./Components/General/Home";
import Navbar from "./Components/General/Navbar";
import Upload from "./Components/Gallery/Upload";
import Gallery from "./Components/Gallery/Gallery";
import Privacy from "./Components/General/Privacy";
import Footer from "./Components/General/Footer";

import AuthContext from "./Context/AuthContext";

function App() {
  const [showNav, setShowNav] = useState(false);
  const [isTrash, setIsTrash] = useState(false)

  useEffect(() => {
      if (window.location.href.includes('/trash')) {
        setIsTrash(true)
      }
    }, [])

  const [checkAuth, setCheckAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  const authValue = { checkAuth, setCheckAuth };
  
  const HomeRoutes = () => useRoutes([
    {path: '/', element: <Home />},
    {path: '/home', element: <Home />},
    {path: '/root', element: <Home />},
    {path: '/homepage', element: <Home />}
  ])

  const GalleryRoutes = () => useRoutes([
    {path: 'trash', element: <Gallery />},
    {path: 'favorites', element: <Gallery />},
  ])

  return (
    <AuthContext.Provider value={authValue}>
      <Router>
        
        <Navbar showNav={showNav} setShowNav={setShowNav} />
        <Routes>
          <Route element={<HomeRoutes />} path="*" />
          <Route element={<Privacy />} path="/yourprivacy" />
          <Route element={<CreateAccount />} path="/register" />
          <Route element={<Login />} path="/login" />

          <Route
            element={
              <Gallery
                showNav={showNav}
                setShowNav={setShowNav}
                isTrash={isTrash}
                setIsTrash={setIsTrash}
              />
            }
            path={"/gallery"}
          >
            <Route element={<GalleryRoutes showNav={showNav}
                setShowNav={setShowNav}/>} path="*"/>
          </Route>
          <Route element={<Upload />} path="/upload" />
          <Route element={<Profile />} path="/profile" />
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
