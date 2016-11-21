import {browserHistory} from 'react-router';

import Firebase from './firebaseinit';
import Database from './database';

export const AUTH_USER_ANONYM = 'AUTH_USER_ANONYM';
export const AUTH_USER_FULL = 'AUTH_USER_FULL';

export const AUTH_ERROR = 'AUTH_ERROR';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

export const CREATE_HUB_SUCCESS = 'CREATE_HUB_SUCCESS';
export const CREATE_HUB_ERROR = 'CREATE_HUB_ERROR';

export const UPLOAD_FILES = 'UPLOAD_FILES';

export function signInUser(credentials) {
    return function(dispatch) {
        Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(response => {
            dispatch(authUserFull());
            browserHistory.push('/dashboard');
        }).catch(error => {
            console.log(error);
            dispatch(authError(error));
        });
    }
}

export function signUpUser(credentials) {
    return function(dispatch) {
        getCurrentUser().then(function(user) {
            // get current hubs and assign them the new user
            if (user != null) {
                Firebase.auth().signOut();
                user.delete();
            }

            Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then(response => {
                dispatch(authUserFull());
                browserHistory.push('/dashboard');
            }).catch(error => {
                dispatch(authError(error));
            });

        });
    }
}

// always dispatch error and resolve
function getCurrentUser() {
    return new Promise(function(resolve, reject) {
        Firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                resolve(user);
            } else {
                resolve();
            }
        });
    });
}

// export function signInAnonymously() {
//     return function(dispatch) {
//         getCurrentUser(function(user) {
//             if (!user) {
//                 Firebase.auth().signInAnonymously()
//                     .then(response => {
//                         dispatch(authUser());
//                     })
//                     .catch(error => {
//                         dispatch(authError(error));
//                     });
//             }
//         });
//
//
//
//     }
// }

export function verifyAuth() {
    return function(dispatch) {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(authUserAnonym());
            } else {
                dispatch(signOutUser());
            }
        })
    }
}

export function initialAuth() {
    return function(dispatch) {
        getCurrentUser().then(function(user) {
            if (user == null) {
                Firebase.auth().signInAnonymously().then(response => {
                    dispatch(authUserAnonym());
                }).catch(error => {
                    dispatch(authError(error));
                });
            }
            Firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    if (user.isAnonymous)
                        dispatch(authUserAnonym());
                    else {
                        dispatch(authUserFull());
                    }
                } else {
                    dispatch(signOutUser());
                }
            })
        });

    }
}

export function signOutUser() {
    // Do not uncomment this line it caused the rooting error browserHistory.push('/');
    Firebase.auth().signOut();
    return {type: SIGN_OUT_USER}
}

export function authUserFull() {
    return {type: AUTH_USER_FULL}
}

export function authUserAnonym() {
    return {type: AUTH_USER_ANONYM}
}

export function authError(error) {
    return {type: AUTH_ERROR, payload: error}
}

export function uploadFile() {
    return {type: AUTH_ERROR}
}

export function createHubSend(error) {
    if (error)
        return {type: CREATE_HUB_ERROR, payload: error}
    else
        return {type: CREATE_HUB_SUCCESS}
    }

export function createHub(data) {
    return function(dispatch) {
        getCurrentUser().then(function(user) {
            console.log("create2");
            if (user != null) {
                console.log("create");
                Database.createHub(data.name, data.description, data.url, user.uid, data.isPublic, data.destructionTimeInHours).then(response => {
                    dispatch(createHubSend());
                }).catch(error => {
                    dispatch(createHubSend(error));
                });
            } else {
                dispatch(createHubSend("User is not logged in"));
            }

        })

    }

}

import request from 'superagent';

export function uploadFiles(acceptedFiles, hub) {
    return function(dispatch) {
        getCurrentUser().then(function(user){
            var req = request.post('/upload');
            acceptedFiles.forEach((file) => {
                console.log('attached: ' + file.name);
                req.attach(file.name, file);
            });

            req.field('hubid', hub.id);
            console.log("uid:"+ user.uid);
            req.field('useruid', user.uid);
            //req.attach('file', acceptedFiles[0]);
            req.end((err, res) => {
                if (!err) {
                    console.log('everythings fine');
                    var message = "";
                    for (var property in res) {
                        if (res.hasOwnProperty(property)) {
                            message = message + property + ": " + res[property] + "\n";
                        }
                    }
                    alert(message);

                    dispatch(uploadFile());
                } else {
                    dispatch(uploadFile());
                    console.log(err);
                    alert('Error appeard');
                }
            });
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
