import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SignIn from "./webpages/SignIn";
import SignUp from "./webpages/SignUp";
import Feeds from "./webpages/Feeds";
import { useSelector } from "react-redux";
import Feed from "./webpages/Feed";

import User from "./webpages/User";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Route path="/sign-in" component={SignIn} exact /> */}
        <Route path="/" component={SignIn} exact />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/feeds" component={Feeds} />
        <Route path="/feed/:feedId" component={Feed} />
        <Route path="/user/:userId" component={User} />
        {/* <Route path="/" component={User} /> */}
      </Router>
    </div>
  );
}

export default App;
