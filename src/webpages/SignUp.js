import "./css/Sign_Up.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_USER } from "../constants/userListConstants";

export default function SignUp() {
  const [user, setUser] = useState({});
  const [userExists, setUserExists] = useState(false);
  const users = useSelector((state) => state.userList.users);
  const dispatch = useDispatch();

  function changeHandler(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function verifySignInDetails() {
    const existingUser = users.find(
      (existingUser) => existingUser.email === user.email
    );
    if (existingUser) {
      setUserExists(true);
    } else {
      // dispatch(userActions)
      dispatch({ type: ADD_USER, payload: user });
      setUserExists(false);
    }
  }
  return (
    <div className="Sign-up-container">
      <div className="Sign-up-box">
        <div className="sign-up">Sign up</div>
        <div className="welcome-back">Create Account for Camp K12</div>
        <input placeholder="Email" name="email" onChange={changeHandler} />
        <input
          placeholder="Password"
          name="password"
          onChange={changeHandler}
        />
        <input
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={changeHandler}
        />
        <input
          placeholder="Full Name"
          name="fullName"
          onChange={changeHandler}
        />
        {userExists ? (
          <div className="account-exists">
            Oops, account with this email already exists! Try again with
            different email
          </div>
        ) : null}
        <div className="sing-up-button" onClick={verifySignInDetails}>
          SIGN UP
        </div>
        <div className="dont-have-an-acc">
          Already have an account? <span>Sign In</span>
        </div>
      </div>
    </div>
  );
}
