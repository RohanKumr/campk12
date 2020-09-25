import React, { useState, useEffect } from "react";
import "./css/Sign_In.css";
import { useSelector, useDispatch } from "react-redux";
// import { USER_LOGIN } from "../constants/userLoginConstants";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { signin } from "../actions/userLoginActions";

export default function SignIn(props) {
  const [user, setUser] = useState({});
  const users = useSelector((state) => state.userList.users);
  const { userInfo } = useSelector(
    (state) => state.userLoginDetails.LoggedInUser
  );

  const [validLoginDetails, setValidLoginDetails] = useState(true);
  const dispatch = useDispatch();

  function changeHandler(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push("/feeds");
    }
    return () => {};
  }, [userInfo]);

  function verifySignInDetails() {
    const existingUser = users.find(
      (existingUser) =>
        existingUser.email === user.email &&
        existingUser.password == user.password
    );
    console.log(existingUser);
    if (existingUser) {
      console.log("Correct Login");
      setValidLoginDetails(true);
      // dispatch({ type: USER_LOGIN, payload: existingUser });
      dispatch(signin(existingUser));
    } else {
      console.log("Invalid Login");
      setValidLoginDetails(false);
    }
  }
  return (
    <div className="Sign-in-container">
      <div className="Sign-in-box">
        <div className="sign-in">Sign in</div>
        <div className="welcome-back">Welcome back</div>
        <input placeholder="Email" name="email" onChange={changeHandler} />
        <input
          placeholder="Password"
          name="password"
          onChange={changeHandler}
        />
        <div className="forgot-password">Forgot Password?</div>
        {validLoginDetails ? null : (
          <div className="incorrect-password">Incorrect Password</div>
        )}
        <div className="sign-in-button" onClick={verifySignInDetails}>
          SIGN IN
        </div>
        <div className="dont-have-an-acc">
          Don’t have an account? <Link to="/sign-up">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
