/*global require, module */
/*jslint node: true */
"use strict";
(function (global) {
    function Auth(firebase) {
      
    
        
        this.registerAnonym = function () {
            return firebase.auth().signInAnonymously();
        };
        
        // Listens for SignIn and Out events, If you wanna know that a user was successful signed in use this method
        this.listen = function (onSignedIn, onSignedOut) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    
                    // user.isAnonymous;
                    // user.uid;
                    onSignedIn(user);
                } else {
                    onSignedOut();
                }
            });
        };
    }
    global.Auth = Auth;
})(window);