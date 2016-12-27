import {combineReducers} from 'redux';

import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import HubReducer from './hub';
import FileReducer from './file';

const rootReducer = combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  hub: HubReducer,
  file: FileReducer
});


export default rootReducer;
