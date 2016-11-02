import { AUTH_USER_ANONYM, AUTH_USER_FULL, SIGN_OUT_USER, AUTH_ERROR } from '../actions';


const initialState = {
  authenticated: false,
  error: null
};

export default function gifs(state = initialState, action) {
  switch (action.type){
    case AUTH_USER_ANONYM:
      return {
        ...state,
        authenticatedAnonym: true,
        authenticatedFull: false,
        error: null
      };
    case AUTH_USER_FULL:
      return {
        ...state,
        authenticatedFull: true,
        authenticatedAnonym: false,
        error: null
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticatedFull: false,
        authenticatedAnonym: false,
        error: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        authenticatedFull: false,
        authenticatedAnonym: false,
        error: action.payload.message
      }
    default:
      return state;
  }
}
