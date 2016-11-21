import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Database from '../actions/database';
export default function(WrappedComponent) {
  class HubChecker extends React.Component {

      constructor(props) {
       super(props);
       this.state = {};
       this.setHub = this.setHub.bind(this);


}
setHub(hub){
    console.log('sdfsd');
    this.setState({'hub': hub});
}
    componentWillMount() {

        console.log(this.props.location.pathname.substring(1));

        Database.findHubByUrl(this.props.location.pathname.substring(1))
        .then((x) => {
            console.log('????');
                this.setHub(x);

        }).catch(function(e){
            console.log(e);
            browserHistory.push('/noaccess');
        });




    }
    render() {
        if(this.state.hub == null)
            return <div>Loading</div>
        else{
            console.log('he: ' + this.state.hub);
            const newProps = {
           hub: this.state.hub
         }
            return <WrappedComponent {...newProps} {...this.props} />
}

    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticatedFull };
  }

  return connect(mapStateToProps)(HubChecker);

}
