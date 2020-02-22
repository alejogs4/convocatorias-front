// packages
import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// components
import Login from './Login';
import Home from './Home';

function Pages() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default Pages;
