import { CREATE_HUB_SUCCESS, CREATE_HUB_ERROR } from '../actions';


const initialState = {
  error: null
};

export default function gifs(state = initialState, action) {
  switch (action.type){
    case CREATE_HUB_SUCCESS:
      return {
        ...state,
        error: null
      };
    case CREATE_HUB_ERROR:
      return {
        ...state,
        error: action.payload.message
      };
    default:
      return state;
  }
}
