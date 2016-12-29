
// --- Imports ----


// >>> Redux
import {combineReducers} from 'redux';


// >>> Reducers
import AuthReducer from './auth';
import HubReducer from './hub';
import FileReducer from './file';
import {routerReducer } from 'react-router-redux'; // routerReducer from https://github.com/reactjs/react-router-redux
import { reducer as formReducer } from 'redux-form'; // formReducer from https://github.com/erikras/redux-form/



// --- Code ----


// Combine Every Reducer into rootReducer
const rootReducer = combineReducers({
	form: formReducer, // reducer which will receive every form stuff (from middleware redux-form)
	routing: routerReducer, // a reducer which will receive URL/history actions

	// Own Reducers:
	auth: AuthReducer,
	hub: HubReducer,
	file: FileReducer
});


export default rootReducer; // Export rootReducer
