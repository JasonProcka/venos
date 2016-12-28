import { FILE_UPLOAD_SUCCESS, FILE_UPLOAD_ERROR } from '../actions';


const initialState = {
	successful: false,
	files: null,
	error: null
};

export default function file(state = initialState, action) {
  switch (action.type){
    case FILE_UPLOAD_SUCCESS:
      return {
        ...state,
		files: action.files,
        successful: true,
        error: null
      };
    case FILE_UPLOAD_ERROR:
      return {
        ...state,
		files: null,
        successful: false,
        error: action.payload.message
      };
    default:
      return state;
  }
}
