import { browserHistory } from 'react-router';
import Firebase from 'firebase';
import * as Database from './database';




export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const CREATE_HUB_SUCCESS = 'CREATE_HUB_SUCCESS';
export const CREATE_HUB_ERROR = 'CREATE_HUB_ERROR';

const config = {
   apiKey: "AIzaSyCgj1rbQDMkDE80I7lYiDdeEvAHiQNDJGU",
   authDomain: "project-mango-5d7d3.firebaseapp.com",
   databaseURL: "https://project-mango-5d7d3.firebaseio.com",
   storageBucket: "project-mango-5d7d3.appspot.com",
   messagingSenderId: "663419739417"
 };

Firebase.initializeApp(config);

Database.setDatabase(Firebase);


export function signUpUser(credentials) {
  return function(dispatch) {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/dashboard');
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      })
  }
}


export function signInUser(credentials){
  return function(dispatch) {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/dashboard');
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}

function getCurrentUser(func){
    return function(dispatch){
        return dispatch(Firebase.auth()
        .then(response => {
            dispatch(func(response));
        }));
    }
}

export function signInAnonymously(){
  return function(dispatch) {
    getCurrentUser(function(user){
        if(!user){
        Firebase.auth().signInAnonymously()
          .then(response => {
            dispatch(authUser());
          })
          .catch(error => {
            dispatch(authError(error));
          });
      }
  });



  }
}


export function verifyAuth() {
  return function (dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    })
  }
}



export function signOutUser()
{
  // Do not uncomment this line it caused the rooting error browserHistory.push('/');
  return {
    type: SIGN_OUT_USER
  }
}




export function authUser() {
  return {
    type: AUTH_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}


export function createHubSend(error) {
  if(error)
    return {
      type: CREATE_HUB_ERROR,
      payload: error
    }
  else
    return {
      type: CREATE_HUB_SUCCESS

    }
}



export function createHub(data){
   return function(dispatch) {
    var user = Firebase.auth().currentUser;
    Database.createHub(user.displayName, data.url, user.uid, data.isPublic, data.DestructHours)
      .then(response => {
        dispatch(createHubSend());
      })
      .catch(error => {
        dispatch(createHubSend(error));
      });
  }


}
