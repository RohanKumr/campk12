import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./containers/Login/SignIn";
import SignUp from "./containers/Login/SignUp";
import FeedsWrapper from "./containers/Feeds/FeedsWrapper";
import Feed from "./containers/Feed/Feed";
import User from "./containers/Profile/User";
import NotFound from "./components/404Error/NotFound";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/campk12" component={SignIn} exact />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/feeds" component={FeedsWrapper} />
          <Route path="/feed/:feedId" component={Feed} />
          <Route path="/user/:userId" component={User} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
