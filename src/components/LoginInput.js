import React from "react";
import "./LoginInput.css";

export const LoginInput = ({
  name,
  email,
  placeholder,
  onChange,
  type,
  onKeyPress,
  ...props
}) => {
  return (
    <input
      className="login-input"
      type={type}
      name={name}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

LoginInput.defaultProps = {
  type: "text",
  className: "",
};
