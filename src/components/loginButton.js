import React from "react";
import "./loginButton.css";

export const LoginButton = (props) => {
  return (
    <button onClick={() => props.onClick()} className="sign-in-button">
      {props.text}
    </button>
  );
};
