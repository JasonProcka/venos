import React from 'react'
import * as firebase from 'firebase';

export default React.createClass({
    
    
   getInitialState: function() {
        return {
            loggedIn: (null !== require('firebase').auth().currentUser)
        }
    },
    componentWillMount: function() {
        firebase.auth().onAuthStateChanged(firebaseUser => {

            this.setState({
                loggedIn: (null !== firebaseUser)
            })

            if (firebaseUser) {
                console.log("Logged IN", firebaseUser);
            } else {
                console.log('Not logged in');
            }
        });
    },  
  render() {
    return (
        <div>
            {this.props.children}
        </div>
    )
  }
})