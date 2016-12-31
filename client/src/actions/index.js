
// --- Imports ----


// >>> React
import {browserHistory} from 'react-router';

// >>> react-router-redux
import { push } from 'react-router-redux'

// >>> Modules
import DatabaseUtil, {Firebase} from '../shared/database'
import {HubC} from '../shared/models';
import request from 'superagent';
import util from 'util';

// >>> Material-UI
import Snackbar from 'material-ui/Snackbar';




// --- Action Consts ----


// >>> Auth Consts
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';

// >>> Hub Consts
export const HUB_CREATE_SUCCESS = 'HUB_CREATE_SUCCESS';
export const HUB_CREATE_ERROR = 'HUB_CREATE_ERROR';
export const HUB_FETCH_SUCCESS = 'HUB_FETCH_SUCCESS';
export const HUB_FETCH_ERROR = 'HUB_FETCH_ERROR';

// >>> Files
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS';
export const FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';



// --- Action Functions ----


function action_AuthUser(user) {
    return {type: AUTH_USER, user}
}
function action_AuthSignOut() {
    return {type: AUTH_SIGN_OUT}
}
function action_AuthError(error) {
    return {type: AUTH_ERROR, payload: error}
}


function action_CreateHub(hub) {
    return {type: HUB_CREATE_SUCCESS, hub}
}
function action_CreateHubError(error) {

    return {type: HUB_CREATE_ERROR, payload: error}
}

function action_FetchHub(hub) {
    return {type: HUB_FETCH_SUCCESS, hub}
}
function action_FetchHubError(error) {
	
    return {type: HUB_CREATE_ERROR, payload: error}
}


function action_UploadFile() {
    return {type: FILE_UPLOAD_SUCCESS}
}
function action_UploadFileError() {
    return {type: FILE_UPLOAD_ERROR}
}

// Export the action functions
export {
	action_AuthUser,
	action_AuthError,
	action_CreateHub,
	action_CreateHubError,
	action_UploadFile,
	action_UploadFileError
}


// --- Trigger functions  ----


// Action to sign in a user
function signInUser(credentials) {
    return (dispatch, getState) => {
		let user = getState().auth.user;
		if(user && user.isAnonymous){

        	Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(user => {
	            dispatch(
					action_AuthUser(user)		// Action that submits Auth Event
				).
				then(
					() => dispatch(push('/dashboard')) // after user got successfully signed in move him to /dashboard
				);
	        }).catch(error => {
	            dispatch(action_AuthError(error)); // If an error appears while signing in do dispatch an error
	        });

		} else {
			dispatch(action_AuthError("Already signed up")); // User is already signed in, send error for signing in again
		}
    }
}





// Action to sign up a user with credentials.email and credentials.password
function signUpUser(credentials) {
    return (dispatch, getState) => {

		// TODO take old hubs and assign them the new user so that they are not lost from an anonymous account

		let user = getState().auth.user;

		if(user && user.isAnonymous){
			// If user is Anonymous then delete his current account
	        var auth = Firebase.auth();
			auth.signOut();
			auth.currentUser.delete();
		}

		if(user && !user.isAnonymous){ // he has an account which is not anonymous, we know his email
			return; // we don't need to do something here, the user is already signed up so why should we sign him up again.
		}

		// Take credentials.email and credentials.password and create a new user
        Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
		.then(user => {
            dispatch(
				action_AuthUser(user)	// Action that submits Auth Event
			).then(
				() => dispatch(push('/dashboard'))	 // after user got successfully signed in move him to /dashboard
			);
        }).catch(error => {
            dispatch(action_AuthError(error));
        });
	}
}



// Action To Sign Out A User and Redirect him to the Dashboard
function signOutUser(){
	return (dispatch) => {
		Firebase.auth().signOut().then(() => dispatch(action_AuthSignOut()).then(() => dispatch(push('/dashboard'))));
	}
}



// checks on every page call if the user is signed in and returns the corresponding Action to the Reducers otherwise we would loose our authenticated state if we visit a new page after login
function verifyAuth() {
	return (dispatch) => {
    	Firebase.auth().onAuthStateChanged(user => {
        	if (user) {
                	dispatch(action_AuthUser(user));
        	} else {  // if a user is not signed in, sign in anonymously (everyone should always be registered)
            	Firebase.auth().signInAnonymously().then(user => {
                	dispatch(action_AuthUser(user));
            	})
				.catch(error => {
                	dispatch(action_AuthError(error));
            	});
      		}
    	});
  	}
}

function fetchHubByUrl(url) {
	return (dispatch) => {
		DatabaseUtil.getHubByUrl(url)
		.then((hub) => dispatch(action_FetchHub(hub)))
		.catch((err) => dispatch(action_FetchHubError(err)));
	}
}



// Create a Hub with {name, description, url, (user.uid - passed by method), isPublicHub, destructionTimeInHours}
function createHub(data) {
    return (dispatch, getState) => {

		let user = getState().auth.user;
		data[HubC.OWNER] = user.uid;
        if(user && user.uid){

			// Method for creating the hub
            DatabaseUtil.createHub(data)
            .then(hub => dispatch(action_CreateHub(hub))) // dispatch create hub action to reducers
			.then(() => dispatch(push(`/${data.url}`)))
			.catch((error) => {
				dispatch(action_CreateHubError(new Error("Here: " + error.message)));
			});

        }else{
            dispatch(action_CreateHubError(new Error("User not authenticated"))); // send Error Action if hub can't be created
			// TODO maybe add an action that can be used to show that the attempt requires authentication
        }
    }
}



// Upload Files to an hub
function uploadFiles(files, hub) {
    return (dispatch, state) => {
        let user = state.auth.user;
		if(user){
			let req = request.post('/upload'); // Post request to /upload
	        files.forEach((file) => {
	            req.attach(file.name, file);	// Attach each file to the request
	        });

			// Add fields to the request
	        req.field('hubid', hub.id);
	        req.field('useruid', user.uid);

			// When the request is done
	        req.end((err, res) => {
	            (!err && res ? dispatch(action_UploadFile()) : dispatch(action_UploadFileError(err)));
	        });
		}else{
			dispatch(action_UploadFileError("You need to be authenticated to upload a file"))
		}
    }
}
export {
	signInUser,
	signUpUser,
	signOutUser,
	verifyAuth,
	createHub,
	uploadFiles,
	fetchHubByUrl
}

// export function createHub(data){
//     return function(dispatch) {
// -       console.log('test5');
// +
// +    Database.createHub(data.name, data.description, "f", true, true, 48)
//        .then(response => {
//          dispatch(createHubSend());
//        })
//        .catch(error => {
//          dispatch(createHubSend(error));
//        });
//    }
// }
