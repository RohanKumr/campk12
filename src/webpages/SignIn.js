import React, { useState, useEffect } from "react";
import "./css/Sign_In.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userLoginActions";

export default function SignIn(props) {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  //toggles Incorrect Password error for both fields
  const [validateUser, setValidateUser] = useState(true);
  const users = useSelector((state) => state.userList.users);
  const { userInfo } = useSelector(
    (state) => state.userLoginDetails.LoggedInUser
  );

  useEffect(() => {
    if (userInfo) {
      props.history.push("/feeds/" + userInfo._id);
    }
    return () => {};
  }, [userInfo, props]);

  const dispatch = useDispatch();

  function changeHandler(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
    if (user.email && !user.email.includes("@")) {
      setError("Incorrect Email");
      setValidateUser(false);
      return;
    }
    if (user.password && user.password.length < 4) {
      setError("Password must be 5 letters");
      setValidateUser(false);
      return;
    }

    if (user.email && user.email.includes("@")) setValidateUser(true);
    if (user.password && user.password.length > 6) setValidateUser(true);
  }

  function verifySignInDetails() {
    const existingUser = users.find(
      (existingUser) =>
        existingUser.email === user.email &&
        existingUser.password === user.password
    );
    //Returns the user if it exists
    if (existingUser) {
      setValidateUser(true);
      // dispatch({ type: USER_LOGIN, payload: existingUser });
      dispatch(signin(existingUser));
    } else {
      setValidateUser(false);
      setError("Incorrect Username Or Password");
    }
  }
  function keyPress(event) {
    if (event.key === "Enter") {
      verifySignInDetails();
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
          type="password"
          onKeyPress={keyPress}
          onChange={changeHandler}
        />
        <div className="forgot-password">Forgot Password?</div>
        {validateUser ? null : (
          <div className="incorrect-password">{error}</div>
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
