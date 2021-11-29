import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="spinner">
      <div className="ball"></div>
      <p>LOADING</p>
    </div>
  );
}

export default LoadingSpinner;
