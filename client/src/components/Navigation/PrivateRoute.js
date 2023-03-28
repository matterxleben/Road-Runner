import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Landing from '../Landing';
import history from './history';
import JoinEvent from '../JoinEvent';
import AddEvent from "../AddEvent";
import AddFriend from "../AddFriend";
import AddRun from "../AddRun";
import Profile from "../Profile";
import UserDetails from "../UserDetails";
import FriendProfile from "../FriendProfile";
import OtherProfile from "../OtherProfile";


export default function PrivateRoute({

}) {
    return (

        <Router history={history}>
            <Switch>
                <Route path="/Home" exact component={Home} />
                <Route path="/SignIn" exact component={SignIn} />
                <Route path="/SignUp" exact component={SignUp} />
                <Route path="/" exact component={Landing} />
                <Route path="/AddEvent" exact component={AddEvent} />
                <Route path="/JoinEvent" exact component={JoinEvent} />
                <Route path="/AddFriend" exact component={AddFriend} />
                <Route path="/AddRun" exact component={AddRun} />
                <Route path="/Profile" exact component={Profile} />
                <Route path="/UserDetails" exact component={UserDetails} />
                <Route path="/FriendProfile" exact component={FriendProfile} />
                <Route path="/OtherProfile" exact component={OtherProfile} />
            </Switch>
        </Router>
    );
}