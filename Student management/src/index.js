import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { MainContextProvider } from "./contexts/MainContext";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
