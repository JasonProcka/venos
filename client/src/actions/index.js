
// --- Imports ----


// >>> React
import {browserHistory} from 'react-router';

// >>> react-router-redux
import { push,go, replace} from 'react-router-redux'

// >>> Modules
import Firebase from 'firebase';

import VRequest from '../libs2/vrequest';
import config from '../shared/config'
Firebase.initializeApp(config);
import DatabaseUtil  from '../shared/database';

const database = new DatabaseUtil(Firebase.database());
import {HubC} from '../shared/models';
import request from 'superagent';
import util from 'util';

// >>> Material-UI
import Snackbar from 'material-ui/Snackbar';






// --- Action Consts ----


// >>> Auth Consts
export const AUTH_ANON = 'AUTH_ANON';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
export const AUTH_ALREADY_SIGNED_IN = "AUTH_ALREADY_SIGNED_IN";

// >>> Hub Consts
export const HUB_CREATE_SUCCESS = 'HUB_CREATE_SUCCESS';
export const HUB_CREATE_ERROR = 'HUB_CREATE_ERROR';
export const HUB_FETCH_SUCCESS = 'HUB_FETCH_SUCCESS';
export const HUB_FETCH_ERROR = 'HUB_FETCH_ERROR';
export const HUB_QUICK_SHARE_KEY = 'HUB_QUICK_SHARE_KEY';
export const HUB_QUICK_SHARE_KEY_ERROR = 'HUB_QUICK_SHARE_KEY_ERROR';

// >>> Files
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS';
export const FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';
export const FILE_UPLOAD_START = 'FILE_UPLOAD_START';




// --- Action Functions ----

function action_AuthAnon(user) {
    return {type: AUTH_ANON, user}
}
function action_AuthUser(user) {
    return {type: AUTH_USER, user}
}
function action_AuthSignOut() {
    return {type: AUTH_SIGN_OUT}
}
function action_AuthError(error) {
    return {type: AUTH_ERROR, payload: error}
}
function action_AuthAlreadySignedIn(error) {
    return {type: AUTH_ALREADY_SIGNED_IN, payload: error}
}



function action_CreateHub(hub) {
    return {type: HUB_CREATE_SUCCESS, hub}
}
function action_CreateHubError(error) {

    return {type: HUB_CREATE_ERROR, payload: error}
}
function action_HubQuickShareKey(key) {
    return {type: HUB_QUICK_SHARE_KEY, key}
}
function action_HubQuickShareKeyError(err) {
    return {type: HUB_QUICK_SHARE_KEY_ERROR, payload: err}
}

function action_FetchHub(hub) {
    return {type: HUB_FETCH_SUCCESS, hub}
}
function action_FetchHubError(error) {

    return {type: HUB_CREATE_ERROR, payload: error}
}


function action_UploadFile(files) {
    return {type: FILE_UPLOAD_SUCCESS, files}
}
function action_UploadFileError() {
    return {type: FILE_UPLOAD_ERROR}
}
function action_UploadFileStart() {
    return {type: FILE_UPLOAD_START}
}

// Export the action functions
export {
	action_AuthUser,
	action_AuthError,
	action_CreateHub,
	action_CreateHubError,
	action_UploadFile,
	action_UploadFileError,
	action_UploadFileStart,
	action_AuthAlreadySignedIn,
	action_AuthAnon
}


// --- Trigger functions  ----


// Action to sign in a user
function signInUser(credentials) {
	console.log('2');
    return (dispatch, getState) => {
		let user = getState().auth.user;
		console.log('u' + user);
		if(user && user.anon){
			if(credentials && credentials.email && credentials.password)
				request
				.post('/signin')
				.send(credentials)
				.end((err, res) => {
					if(err || !res.ok)
						dispatch(action_AuthError(err)); // If an error appears while signing in do dispatch an error
					else {
						dispatch(action_AuthUser(JSON.parse(res.text)));		// Action that submits Auth Event
						dispatch(push('/dashboard')) // after user got successfully signed in move him to /dashboard

					}
				})
			else {
				dispatch(action_AuthError("Credentials not specified"));
			}

		} else {
			dispatch(action_AuthAlreadySignedIn()); // User is already signed in, send error for signing in again
		}
    }
}




function signUpAnon(){
	return (dispatch, getState) => {

		// TODO take old hubs and assign them the new user so that they are not lost from an anonymous account

		let user = getState().auth.user;
		if(user === null){
			// Take credentials.email and credentials.password and create a new user
			request
			.post('/signupanon')
			.send()
			.end((err, res) => {
				if(err || !res.ok)
					dispatch(action_AuthError(err)); // If an error appears while signing in do dispatch an error
				else {
					dispatch(action_AuthAnon(JSON.parse(res.text)))		// Action that submits Auth Event
				}
			})
		}else{
			dispatch(action_AuthAlreadySignedIn());
		}
	}
}




// Action to sign up a user with credentials.email and credentials.password
function signUpUser(credentials) {
    return (dispatch, getState) => {

		// TODO take old hubs and assign them the new user so that they are not lost from an anonymous account

		let user = getState().auth.user;

		if(user && user.anon){
			// Take credentials.email and credentials.password and create a new user
			if(credentials && credentials.email && credentials.password)
				request
				.post('/signup')
				.send(credentials)
				.end((err, res) => {
					if(err || !res.ok)
						dispatch(action_AuthError(err)); // If an error appears while signing in do dispatch an error
					else {
						console.log("user: " + util.inspect(res));
						dispatch(action_AuthUser(JSON.parse(res.text)))		// Action that submits Auth Event
						dispatch(push('/dashboard'))
					}
				})
			else {
				dispatch(action_AuthError("No credentials specified"));
			}
		}else{
			dispatch(action_AuthAlreadySignedIn());
		}
	}
}







// checks on every page call if the user is signed in and returns the corresponding Action to the Reducers otherwise we would loose our authenticated state if we visit a new page after login
function verifyAuth() {
	return (dispatch) => {
		console.log('test');
		request
		.post('/isauthenticated')
		.withCredentials()
		.end((err, res) => {

			if(err || !res.ok)
				dispatch(action_AuthError(err ? err : "something wrong in verifyAuth")); // If an error appears while signing in do dispatch an error
			else {
				if(res.text){
					console.log("user: " + util.inspect(res));
					let user = JSON.parse(res.text);
					if(user.email) // if user is persistent
						dispatch(action_AuthUser(user))
					else // if user is anon
						dispatch(action_AuthAnon(user))
					 // after user got successfully signed up move him to /dashboard
				}
				else {
					console.log('heeeeeeeeeeeee');
					dispatch(signUpAnon());
				}
			}
		});
	}
}


function enterQuickShareKey(key){
	return (dispatch, getState) => {
		console.log(key);
		VRequest.post('/gettohubbyquickshare', {key} ).then(res => {
			console.log(util.inspect(res))
			dispatch(action_FetchHub(res.body));
			dispatch(push(`/${res.body[HubC.URL]}`));
		}).catch(err => {
			dispatch(action_FetchHubError(err));
		})
	}
}



function fetchHubByUrl(url) {
	return (dispatch, getState) => {
		request
		.post('/gethubbyurl')
		.send({url: getState().routing.locationBeforeTransitions.pathname.substring(1)})
		.end((err, res) => {
			if(err || !res.ok)
				dispatch(action_FetchHubError(err ? err.message : "something wrong in fetchHubByUrl")); // If an error appears while signing in do dispatch an error
			else {
				if(res.text){
					console.log("user: " + util.inspect(res));
					dispatch(action_FetchHub(JSON.parse(res.text)))		// Action that submits Auth Event

				}
				else {
					console.log('h');
					dispatch(action_FetchHubError("response is empty"));
				}
			}
		});
	}
}






// Create a Hub with {name, description, url, (user.uid - passed by method), isPublicHub, destructionTimeInHours}
function createHub(data) {
    return (dispatch, getState) => {

		let user = getState().auth.user;

        if(user && user.uid){


			data[HubC.OWNER] = user.uid;
			console.log("obj" + util.inspect(data));
			request
			.post('/create')
			.send(data)
			.end((err, res) => {

				if(err || !res.ok)
					dispatch(action_CreateHubError(err)); // If an error appears while signing in do dispatch an error
				else {
					console.log(res.text);
					if(res.text){
						let hub = JSON.parse(res.text);
						dispatch(action_CreateHub())		// Action that submits Auth Event
						console.log(hub.url);
						dispatch(push(`/${hub.url}`))

					}
					else {
						dispatch(action_CreateHubError("Something wrong in create hub"));
					}
				}
			});

        }else{
            dispatch(action_CreateHubError("User not authenticated")); // send Error Action if hub can't be created
			// TODO maybe add an action that can be used to show that the attempt requires authentication
        }

    }
}



// Upload Files to an hub
function uploadFiles(files, hub) {
    return (dispatch, getState) => {
		dispatch(action_UploadFileStart());
        let user = getState().auth.user;
		console.log('he');
		if(user){
			let req = request.post('/upload'); // Post request to /upload
	        files.forEach((file, index) => {
	            req.attach(index, file);	// Attach each file to the request
	        });

			// Add fields to the request
	        req.field('hubid', hub.id);

			// When the request is done
	        req.end((err, res) => {
				if(err || !res.ok){
					action_UploadFileError(err ? err : "Something went wrong while uploading files")
				}else{

					dispatch(action_UploadFile(JSON.parse(res.text)));
				}
	        });
		}else{
			dispatch(action_UploadFileError("You need to be authenticated to upload a file"))
		}
    }
}



// Action To Sign Out A User and Redirect him to the Dashboard
function signOutUser(){
	return (dispatch) => {
		console.log('test2');


		request
		.post('/signout')
		.send()
		.end(
			(err, res) => {
				if(err || !res.ok){
					console.log('t2');
					dispatch(action_AuthError()); // could not signout for a weird reason
				}else{
					console.log('t3');
					dispatch(action_AuthSignOut())
					dispatch(push('/dashboard'));
					dispatch(action_AuthAnon());
				}
			}
		);
	}
}
























export {
	enterQuickShareKey,
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
