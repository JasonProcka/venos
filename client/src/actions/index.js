

// React
import {browserHistory} from 'react-router';

// Modules
import Firebase from './firebaseinit';
import Database from './database';
import request from 'superagent';
import util from 'util';

// material-ui
import Snackbar from 'material-ui/Snackbar';


// --- Action Consts ------------------------------------------------------------

// Auth
export const AUTH_USER_ANONYM = 'AUTH_USER_ANONYM';
export const AUTH_USER_FULL = 'AUTH_USER_FULL';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';

// Hub
export const HUB_CREATE_SUCCESS = 'CREATE_HUB_SUCCESS';
export const HUB_CREATE_ERROR = 'CREATE_HUB_ERROR';

// Files
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS';
export const FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';


// --- Login/Register Methods -------------------------------------------------

// Sign In Already signed up user
export function signInUser(credentials) {
    return function(dispatch) {
        Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(response => {
            dispatch(send_AuthUserFull());
            browserHistory.push('/dashboard');
        }).catch(error => {
            dispatch(send_AuthError(error));
        });
    }
}

// Sign Up User with EMail and Password
export function signUpUser(credentials) {
    return function(dispatch) {
        getCurrentUser()
        .then(user => {
            // get current hubs and assign them the new user
            if (user != null) {
                Firebase.auth().signOut();
                user.delete();
            }

            Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then(response => {
                dispatch(send_AuthUserFull());
                browserHistory.push('/dashboard');
            }).catch(error => {
                dispatch(send_AuthError(error));
            });

        }).catch(() =>{
            // user was not logged in (strange behavior) every user is normally logged in with an anonymous account
            // well then we create now an account
            Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then(response => {
                dispatch(send_AuthUserFull());
                browserHistory.push('/dashboard');
            }).catch(error => {
                dispatch(send_AuthError(error));
            });
        });
    }
}

// Sign out user
export function signOutUser() {
    // Do not uncomment this line it caused the rooting error browserHistory.push('/');
    Firebase.auth().signOut();
    return {type: AUTH_SIGN_OUT}
}



// --- Helper Methods ----------------------------------------------------------

// used to get the user when moving from anonymous account to real account
function getCurrentUser() {
    return new Promise(function(resolve, reject) {
        Firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                resolve(user);
            } else {
                reject();
            }
        });
    });
}

// gets the uid from the localStorage TODO: check if it's safe to do so
function getUserUid(){
    let uid;

    for (let key in localStorage) {
      if (key.startsWith("firebase:authUser:")) {
        uid = JSON.parse(localStorage.getItem(key)).uid;
      }
    }
    return uid;
}




// --- Login Verification -------------------------------------------------------

// checks on every page call if the user is signed in and returns the corresponding Action to the Reducers
export function verifyAuth() {
  return function (dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
        if (user) {
            if(user.isAnonymous)
                dispatch(send_AuthUserAnonym());
            else
                dispatch(send_AuthUserFull());
        } else {  // if a user is not signed in, sign in anonymously (everyone should always be registered)
            Firebase.auth().signInAnonymously().then(response => {
                dispatch(send_AuthUserAnonym());
            }).catch(error => {
                dispatch(send_AuthError(error));
            });
      }
    });
  }
}



// --- Actions Submits ----------------------------------------------------------

export function send_AuthUserFull() {
    return {type: AUTH_USER_FULL}
}
export function send_AuthUserAnonym() {
    return {type: AUTH_USER_ANONYM}
}
export function send_AuthError(error) {
    return {type: AUTH_ERROR, payload: error}
}


export function send_CreateHub() {
    return {type: HUB_CREATE_SUCCESS}
}
export function send_CreateHubError(error) {
    return {type: HUB_CREATE_ERROR, payload: error}
}


export function send_UploadFile() {
    return {type: FILE_UPLOAD_SUCCESS}
}
export function send_UploadFileError() {
    return {type: FILE_UPLOAD_ERROR}
}



// --- Hub Methods -------------------------------------------------------------

// Create an Hub
export function createHub(data) {
    return function(dispatch) {
        let uid = getUserUid();
        if(uid){
            Database.
            createHub(data.name, data.description, data.url, uid, data.isPublic, data.destructionTimeInHours).
            then(response => {
                browserHistory.push(`/${data.url}`);
                dispatch(send_CreateHub());
            });
        }else{
            dispatch(send_CreateHubError());
        }
    }
}



// --- File Methods ------------------------------------------------------------
// Files
export function uploadFiles(files, hub) {
    return function(dispatch) {

        let req = request.post('/upload');
        let uid = getUserUid();

        files.forEach((file) => {
            req.attach(file.name, file);
        });
        req.field('hubid', hub.id);
        req.field('useruid', uid);
        req.end((err, res) => {
            if (!err) {
                dispatch(send_UploadFile());
            } else {
                dispatch(send_UploadFileError());
            }
        });
    }

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
