import "./css/Sign_Up.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../actions/userActions";
import { Link } from "react-router-dom";
import hiddenPass from "./img/password-hidden@3x.png";

export default function SignUp(props) {
  const [user, setUser] = useState({});
  const [userExists, setUserExists] = useState(false);
  const [buttonGrey, setButtonGrey] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  //toggles Incorrect Password error for both fields
  const [validateUser, setValidateUser] = useState(true);

  const users = useSelector((state) => state.userList.users);
  const dispatch = useDispatch();

  function changeHandler(event) {
    setUser({ ...user, [event.target.name]: event.target.value });

    if (Object.keys(user).length == 4) {
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
      console.log("SEnding data");
      const existingUser = users.find(
        (existingUser) => existingUser.email === user.email
      );
      if (existingUser) {
        setUserExists(true);
        setError("Opps User Exists");
      } else {
        dispatch(userActions(user));
        props.history.push("/");
        setUserExists(false);
      }
    }
  }

  function showPassword() {
    setShowPass(!showPass);
  }

  return (
    <div className="Sign-up-container">
      <div className="Sign-up-box">
        <div className="sign-up">Sign up</div>
        <div className="welcome-back">Create Account for Camp K12</div>
        <input
          className="input-without-image"
          placeholder="Email"
          name="email"
          onChange={changeHandler}
        />

        <div className="input-with-image">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={changeHandler}
          />
          <img onClick={showPassword} src={hiddenPass} />
        </div>

        <div className="input-with-image">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={changeHandler}
          />
          <img onClick={showPassword} src={hiddenPass} />
        </div>

        <input
          className="input-without-image"
          placeholder="Full Name"
          name="name"
          onChange={changeHandler}
        />
        {validateUser ? null : <div className="account-exists">{error}</div>}
        <button
          className={buttonGrey ? "signup-button-grey" : "signup-button"}
          onClick={verifySignInDetails}
          disabled={buttonGrey}>
          SIGN UP
        </button>
        <div className="dont-have-an-acc">
          Already have an account? <Link to="/">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
