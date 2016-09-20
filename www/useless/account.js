/*global require, module */
/*jslint node: true */
"use strict";
var firebase = require("./initfirebase.js");
var shortid = require('shortid');
var exports = module.exports = {};
var auth = firebase.auth();







// !!!!!!!!!!!!! Module useless !!!!!!!!!!!!!!!!

















// Auth listener that listens for a sign in and sign out. Don't listen on register for a signed in user do it in the listener using registerAuthListener.
/*exports.registerAuthListener = function (onSignedIn, onSignedOut) {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var uid = user.uid, isAnonymous = user.isAnonymous;
            
            onSignedIn(user);
        } else {
            onSignedOut();
            // User is signed out.
            // ...
        }
    });
};
exports.register = function () {
    var uid = shortid.generate(), token = auth.createCustomToken(uid);
    return token;
};*/