import { FILE_UPLOAD_SUCCESS, FILE_UPLOAD_ERROR } from '../actions';


const initialState = {
  error: null
};

export default function gifs(state = initialState, action) {
  switch (action.type){
    case FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        successful: true,
        error: null
      };
    case FILE_UPLOAD_ERROR:
      return {
        ...state,
        successful: false,
        error: action.payload.message
      };
    default:
      return state;
  }
}
