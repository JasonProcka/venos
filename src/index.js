import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import Admin from './containers/Admin';
import Create from './containers/Create';
import Hub from './containers/Hub';
import MyHubs from './containers/MyHubs';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Home from './containers/Home';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="signup" component={SignUp} />
        <Route path="signin" component={SignIn} />
        <Route path="hub/:name" component={Hub} />
        <Route path="create" component={Create} />
        <Route path="admin" component={Admin} />
        <Route path="myhubs" component={MyHubs} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
