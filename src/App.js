import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./webpages/SignIn";
import SignUp from "./webpages/SignUp";
import Feeds from "./webpages/Feeds";
import Feed from "./webpages/Feed";

import User from "./webpages/User";
import NotFound from "./webpages/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/campk12" component={SignIn} exact />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/feeds" component={Feeds} />
          <Route path="/feed/:feedId" component={Feed} />
          <Route path="/user/:userId" component={User} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
