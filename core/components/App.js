import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from 'src/core/auth';
import * as firebase from 'firebase';
import * as config from '../firebase.config.js';



export class App extends Component{
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    static propTypes = {
        auth: PropTypes.object.isRequired,
        children: PropTypes.object.isRequired,
        signOut: PropTypes.func.isRequired
    };



    componentWillReceiveProps(nextProps) {
        const { router } = this.context;
        const { auth } = this.props;

        if (auth.authenticated && !nextProps.auth.authenticated) {
            router.replace(paths.SIGN_IN);
        }
        else if (!auth.authenticated && nextProps.auth.authenticated) {
            router.replace(paths.TASKS);
        }
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}



//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getAuth,
  auth => ({auth})
);

export default connect(
  mapStateToProps,
  authActions
)(App);
