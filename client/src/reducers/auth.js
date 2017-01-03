import { AUTH_ANON, AUTH_USER, AUTH_SIGN_OUT, AUTH_ERROR, AUTH_ALREADY_SIGNED_IN } from '../actions';


const initialState = {
  user: null,
  error: null
};

export default function auth(state = initialState, action) {
  switch (action.type){
    case AUTH_USER:
      return {
        ...state,
		user: {...action.user, anon: false},
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
		user: null,
        error: null
      }
	case AUTH_ALREADY_SIGNED_IN:
		return {
		  ...state,
		  error: "You are already signed in"
	  };
	case AUTH_ANON:
  		return {
			...state,
			user: {...action.user, anon: true},
	        error: null
  	};
    default:
      return state;
  }
}
