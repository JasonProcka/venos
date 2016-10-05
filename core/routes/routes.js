import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../components/App'
import Ui from '../components/Ui'
import Home from '../components/Home'
import { Dashboard, MyHubs, CreateHub, SignUp, SignIn, Admin, Profile } from '../components/Pages'
import Logout from '../components/Logout';

import { isAuthenticated } from '../auth';




export const paths = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
};

const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.TASKS);
    }
  };
};

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route onEnter={requireUnauth}>
            <Route path="/signup" component={SignUp}/>
            <Route path="/login" component={SignIn}/>
        </Route>
        <Route component={Ui} onEnter={requireAuth}>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/my-hubs" component={MyHubs}/>
            <Route path="/create-hub" component={CreateHub}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/me" component={Profile}/>
        </Route>
        <Route path="/logout" component={Logout}/>
    </Route>
)
