
// --- Imports ----


// >>> React
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// >>> Redux
import configureStore from './store/configureStore';
import * as actions from './actions';

// >>> Containers
import Admin from './containers/Admin';
import Create from './containers/Create';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Home from './containers/Home';

// >>>>> Hubs
import HubChecker from './containers/hub/HubChecker';
import MyHubs from './containers/MyHubs';
import Hub from './containers/Hub';

// >>> Components
import App from './components/App';
import NoAccess from './components/NoAccess';

// >>> Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'; // makes MUI work correctly



// >>> react-router-redux
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';



injectTapEventPlugin(); // call the function which makes MUI working correctly

// configure the store for future use
const store = configureStore(); // retrieve the store from our awesome method 'configureStore'
const history = syncHistoryWithStore(browserHistory, store);	// IMPORTANT keep this before you dispatch any actions because they could alter the location but we first need to sync the history(location) with the store

store.dispatch(actions.verifyAuth()); // verify Authentication after every whole refresh of a page so that reducers get updated accordingly (e.g. setting auth to true)

// render the App inside the div with ID #app
ReactDOM.render(
    <MuiThemeProvider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
            
                <IndexRoute component={Home}/>
                <Route path="signin" component={SignIn}/>
                <Route path="login" component={SignIn}/>
                <Route path="join" component={SignUp}/>
                <Route path="signup" component={SignUp}/>
                <Route path="register" component={SignUp}/>
                <Route path="create" component={Create}/>
                <Route path="admin" component={Admin}/>
                <Route path="myhubs" component={MyHubs}/>
                <Route path="noaccess" component={NoAccess}/>
                
            </Route>
            <Route path=":name" component={HubChecker(App)}/>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('app')
);
