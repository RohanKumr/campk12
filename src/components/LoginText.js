import React from "react";
import "./loginText.css";
export const LoginText = (props) => {
  return (
    <>
      <div className="login-heading">{props.heading}</div>
      <div className="login-sub-text">{props.subText}</div>
    </>
  );
};
