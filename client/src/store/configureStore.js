// --- Imports ----

// >>> React
import { browserHistory } from 'react-router'

// >>> Redux
import {createStore, compose, applyMiddleware} from 'redux';

// >>> Middlewares
import {routerMiddleware, push} from 'react-router-redux';
import reduxThunk from 'redux-thunk';

// >>> Reducers
import rootReducer from '../reducers';

// >>> Actions
import * as Actions from '../actions';

// --- Code ----

// compose the enhancers to use
const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify here name, actionsBlacklist, actionsCreators and other options. Only applied in developement because of !== production
    })
    : compose;

// contains the middlewares we wanna apply to our store
const middleware = Array.of(reduxThunk, routerMiddleware(browserHistory));



// Method for creating the store, called in index.js to init store
function configureStore(initialState) {
	// create store enhancers out of our middlewares
    const enhancer = composeEnhancers(
		applyMiddleware(middleware)
	)

	// creates the store using our reducers (rootReducer), an initialState (state at start of application) and store enhancers like redux-thunk
	const store = createStore(rootReducer, initialState, enhancer);


	// Webpack specific variable 'module', check if Hot Module Replacement is enabled
    if (module.hot) {
        // accept update of reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default; // get new updated reducers
            store.replaceReducer(nextRootReducer); // lets store use the new reducers
        });
    }

    // TODO needs to be called somewhere but not here: store.dispatch(Actions.verifyAuth());

    return store;
}

export default configureStore; // Export above function to configure the store
