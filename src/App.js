import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SignIn from "./webpages/SignIn";
import SignUp from "./webpages/SignUp";
import Feeds from "./webpages/Feeds";
import { useSelector } from "react-redux";

function App() {
  // const { userInfo } = useSelector(
  //   (state) => state.userLoginDetails.LoggedInUser
  // );

  // useEffect(() => {
  //   // effect
  //   return () => {
  //     // cleanup
  //   };
  // }, [userInfo]);

  return (
    <div className="App">
      <Router>
        <Route path="/" component={SignIn} exact />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/feeds" component={Feeds} />
      </Router>
    </div>
  );
}

export default App;
