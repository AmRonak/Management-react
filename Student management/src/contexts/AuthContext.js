import React, { createContext, useState } from "react";

const AuthContext = createContext({
  loggedIn: false,
  loginHandler: (id) => {},
  logoutHandler: () => {},
});

export const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
      ? JSON.parse(localStorage.getItem("isLoggedIn"))
      : ""
  );

  const loginHandler = (id) => {
    setLoggedIn(id);
    localStorage.setItem("isLoggedIn", JSON.stringify(id));
  };

  const logoutHandler = () => {
    setLoggedIn("");
    localStorage.removeItem("isLoggedIn");
  };

  const authObj = { loggedIn, loginHandler, logoutHandler };

  return (
    <AuthContext.Provider value={authObj}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
