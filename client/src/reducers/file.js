import { FILE_UPLOAD_START, FILE_UPLOAD_SUCCESS, FILE_UPLOAD_ERROR } from '../actions';


const initialState = {
	successful: false,
	files: [],
	error: null,
	uploading: false
};

export default function file(state = initialState, action) {
  switch (action.type){
	  case FILE_UPLOAD_START:
        return {
          ...state,
		  files: [],
  			uploading: true,
          successful: false,
          error: null
        };

    case FILE_UPLOAD_SUCCESS:
      return {
        ...state,
		files: state.files.concat(action.files),
		uploading: false,
        successful: true,
        error: null
      };
    case FILE_UPLOAD_ERROR:
      return {
        ...state,
		files: [],
		uploading: false,
        successful: false,
        error: action.payload
      };
    default:
      return state;
  }
}
