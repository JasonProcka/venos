
// --- Imports ----


// >>> Redux
import {combineReducers} from 'redux';
import { reducer as FormReducer } from 'redux-form';

// >>> Reducers
import AuthReducer from './auth';
import HubReducer from './hub';
import FileReducer from './file';
import {routerReducer } from 'react-router-redux'; // routerReducer from https://github.com/reactjs/react-router-redux



// --- Code ----


// Combine Every Reducer into rootReducer
const rootReducer = combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  hub: HubReducer,
  file: FileReducer,
  routing: routerReducer // a reducer which will receive URL/history actions
});


export default rootReducer; // Export rootReducer
