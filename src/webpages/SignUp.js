import "./css/Sign_Up.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { ADD_USER } from "../constants/userListConstants";
import { userActions } from "../actions/userActions";
import { Link } from "react-router-dom";
import hiddenPass from "./img/password-hidden@3x.png";
// import hiddenPass from "./img/password-hidden.png";

export default function SignUp(props) {
  const [user, setUser] = useState({});
  const [userExists, setUserExists] = useState(false);
  const [buttonGrey, setButtonGrey] = useState(true);
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
    const existingUser = users.find(
      (existingUser) => existingUser.email === user.email
    );
    if (existingUser) {
      setUserExists(true);
    } else {
      dispatch(userActions(user));
      props.history.push("/");
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
          type="password"
          placeholder="Password"
          name="password"
          onChange={changeHandler}
        />
        <div className="add-flex-spaceb">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={changeHandler}
          />
          <img src={hiddenPass} />
        </div>

        <input placeholder="Full Name" name="name" onChange={changeHandler} />
        {userExists ? (
          <div className="account-exists">
            Oops, account with this email already exists! Try again with
            different email
          </div>
        ) : null}
        <div
          className={buttonGrey ? "sign-up-button-grey" : "sign-up-button"}
          onClick={verifySignInDetails}
          disabled>
          SIGN UP
        </div>
        <div className="dont-have-an-acc">
          Already have an account? <Link to="/">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
