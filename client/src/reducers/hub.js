import { HUB_CREATE_SUCCESS, HUB_CREATE_ERROR } from '../actions';


const initialState = {
	created: false,
	hub: null,
	error: null
};

export default function hub(state = initialState, action) {
  switch (action.type){
    case CREATE_HUB_SUCCESS:
      return {
        ...state,
		hub: actions.hub,
        created: true,
        error: null
      };
    case CREATE_HUB_ERROR:
      return {
        ...state,
		hub: null,
        created: false,
        error: action.payload.message
      };
    default:
      return state;
  }
}
