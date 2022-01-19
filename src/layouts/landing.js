import React from "react";
import Home from "../containers/Home";
import Login from "../components/home/login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const Landing = (props) => {
  // landing page with login and register sections
  return (
    <Switch>
      {/* main routes */}
      <Route path="/home" render={(props) => <Home />} />
    </Switch>
  );
};

export default Landing;
