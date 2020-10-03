import React from "react";
import "./LoginPasswordEye.css";
export const LoginPasswordEye = ({
  type,
  placeholder,
  name,
  onChange,
  onClick,
  src,
  ...props
}) => {
  return (
    <div className="input-with-image">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
      <img alt="" onClick={onClick} src={src} />
    </div>
  );
};
