import "./SignUp.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../actions/userActions";
import hiddenPass from "../../img/password-hidden@3x.png";
import { LoginText } from "../../components/LoginText";
import { LoginFooter } from "../../components/LoginFooter";
import { LoginInput } from "../../components/LoginInput";
import { LoginPasswordEye } from "../../components/LoginPasswordEye";
import { LoginButton } from "../../components/loginButton";
import { LoginError } from "../../components/LoginError";

export default function SignUp(props) {
  const [user, setUser] = useState({});

  const [buttonGrey, setButtonGrey] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  //toggles Incorrect Password error for both fields
  const [validateUser, setValidateUser] = useState(true);

  const users = useSelector((state) => state.userList.users);
  const dispatch = useDispatch();

  function changeHandler(event) {
    setUser({ ...user, [event.target.name]: event.target.value.toString() });

    if (Object.keys(user).length === 4) {
      setButtonGrey(false);
    } else {
      setButtonGrey(true);
    }
  }

  function verifySignInDetails() {
    if (user.email && !user.email.includes("@")) {
      setError("Incorrect Email");
      setValidateUser(false);
      return;
    } else if (user.password && user.password.length < 5) {
      setError("Password must be more than 5 letters");
      setValidateUser(false);
      return;
    } else if (user.confirmPassword && user.confirmPassword !== user.password) {
      setError("Passwords dont match!");
      setValidateUser(false);
      return;
    } else if (user.name && user.name.length <= 6) {
      setError("Provide full name!");
      setValidateUser(false);
      return;
    } else {
      const existingUser = users.find(
        (existingUser) => existingUser.email === user.email
      );
      if (existingUser) {
        setError(
          "Oops, account with this email already exists! Try again with different email"
        );
        setValidateUser(false);
      } else {
        dispatch(userActions(user));
        props.history.push("/campk12");
      }
    }
  }

  function showPassword() {
    setShowPass(!showPass);
  }

  return (
    <div className="Sign-up-container">
      <div className="Sign-up-box">
        <LoginText heading="Sign Up" subText="Create Account for Camp K12" />
        <LoginInput
          className="input-without-image"
          placeholder="Email"
          name="email"
          onChange={changeHandler}
        />
        <LoginPasswordEye
          type={showPass ? "text" : "password"}
          placeholder="Password"
          name="password"
          onChange={changeHandler}
          onClick={showPassword}
          src={hiddenPass}
        />
        <LoginPasswordEye
          type={showPass ? "text" : "password"}
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={changeHandler}
          onClick={showPassword}
          src={hiddenPass}
        />
        <LoginInput
          className="input-without-image"
          placeholder="Full Name"
          name="name"
          onChange={changeHandler}
        />
        <LoginError
          validateUser={validateUser}
          showForgotPassword={false}
          error={error}
        />
        <LoginButton
          class={buttonGrey ? "signup-button-grey" : ""}
          status={buttonGrey}
          onClick={verifySignInDetails}
          text="Sign Up"
        />
        <LoginFooter
          text="Already have an account? "
          toPath="/campk12"
          toText="Sign in"
        />
      </div>
    </div>
  );
}
