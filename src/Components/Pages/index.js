// packages
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

// components
import Header from "../Global/Header";

import Login from "./Login";
import Home from "./Home";
import CurriculumRegister from "./CurriculumRegister";

function Pages() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/curriculum" component={CurriculumRegister} />
      </Switch>
    </Router>
  );
}

export default Pages;
