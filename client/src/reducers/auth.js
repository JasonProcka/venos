import { AUTH_USER, AUTH_SIGN_OUT, AUTH_ERROR } from '../actions';


const initialState = {
  authenticated: false,
  user: null,
  error: null
};

export default function auth(state = initialState, action) {
  switch (action.type){
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
		user: action.user,
        error: null
      };
    case AUTH_SIGN_OUT:
      return {
        ...state,
        authenticated: false,
		user: null,
        error: null
      };
    case AUTH_ERROR:	// Don't overrite user, we throw this because there was an error, maybe the user is already logged in
      return {
        ...state,
        authenticated: false,
        error: null
      }
    default:
      return state;
  }
}
