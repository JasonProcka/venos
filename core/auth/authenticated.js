import * as firebase from 'firebase';



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