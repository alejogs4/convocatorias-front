// packages
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

// components
import Login from "./Login";
import Home from "./Home";
import Header from "../Global/Header";


function Pages() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default Pages;
