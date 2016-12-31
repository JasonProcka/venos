import {HUB_CREATE_SUCCESS, HUB_CREATE_ERROR, HUB_FETCH_SUCCESS, HUB_FETCH_ERROR} from '../actions';

const initialState = {
    created: false,
    hub: null,
    error: undefined
};

export default function hub(state = initialState, action) {
    switch (action.type) {
        case HUB_CREATE_SUCCESS:
            return {
                ...state,
                hub: action.hub,
                created: true,
				fetched: false,
                error: null
            };
        case HUB_CREATE_ERROR:
            return {
                ...state,
                hub: null,
                created: false,
				fetched: false,
                error: action.payload
            };
        case HUB_FETCH_SUCCESS:
            return {
                ...state,
				hub: action.hub,
				created: false,
				fetched: true,
				error: null
            }
		case HUB_FETCH_ERROR:
            return {
                ...state,
				hub: null,
				created: false,
				fetched: false,
				error: action.payload
            }
        default:
            return state;
    }
}
