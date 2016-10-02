import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as config from '../firebase.config.js';
firebase.initializeApp(config);

function RequireAuth(nextState, transition) {
    firebase.auth().onAuthStateChanged(function (loggedIn) {
        if (!loggedIn) {
            transition({
                pathname: '/signup',
                state: {
                    nextPathname: nextState.location.pathname
                }
            });
        }
    });
    /* if(null === firebase.auth().currentUser) {
        // callback();
        replace({
           pathname: '/signup',
           state: { nextPathname: nextState.location.pathname }
         })
         
     }*/
}
module.exports = RequireAuth;