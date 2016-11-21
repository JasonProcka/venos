import {combineReducers} from 'redux';

import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import HubReducer from './hub';

const rootReducer = combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  hub: HubReducer
});


export default rootReducer;
