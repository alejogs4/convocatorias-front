// packages
import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// components
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Header from '../Global/Header';
import CurriculumRegister from './CurriculumRegister';
import Announcement from './Announcement';
import Jobs from './Jobs';

function Pages() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Jobs} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/curriculum" component={CurriculumRegister} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/announcement" component={Announcement} />
      </Switch>
    </Router>
  );
}

export default Pages;
