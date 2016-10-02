import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Ui from './Ui'
import Home from './Home'
import { Dashboard, MyHubs, CreateHub, SignUp, SignIn, Admin, Profile } from './Pages'
import RequireAuth from './authenticated'
import Logout from './Logout';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={SignIn}/>
        <Route component={Ui} onEnter={RequireAuth}>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/my-hubs" component={MyHubs}/>
            <Route path="/create-hub" component={CreateHub}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/me" component={Profile}/>
        </Route>
        <Route path="/logout" component={Logout}/>
    </Route>
)