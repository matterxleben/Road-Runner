import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import SignIn from '../SignIn';
import Landing from '../Landing';
import history from './history';
import Reviews from '../Reviews';
import JoinEvent from '../JoinEvent';
import CreateEvent from "../CreateEvent";

export default function PrivateRoute({

}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/Home" exact component={Home} />
      <Route path="/SignIn" exact component={SignIn} />
      <Route path="/" exact component={Landing} />
      <Route path="/CreateEvent" exact component={CreateEvent} />
      <Route path="/Reviews" exact component={Reviews} />
      <Route path="/JoinEvent" exact component={JoinEvent} />
      </Switch>
    </Router>
  );
}