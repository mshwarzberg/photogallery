import React from "react";

const AuthContext = React.createContext({
  checkAuth: false,
  setCheckAuth: () => {},
});

export default AuthContext;
