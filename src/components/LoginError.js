import React from "react";
import "./LoginError.css";
export const LoginError = ({
  validateUser,
  error,
  showForgotPassword,
  ...props
}) => {
  return (
    <>
      {showForgotPassword ? (
        <div className="forgot-password">Forgot Password?</div>
      ) : null}
      {validateUser ? (
        <div className="incorrect-password-dummy"></div>
      ) : (
        <div className="incorrect-password">{error}</div>
      )}
    </>
  );
};
