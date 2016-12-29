
// --- Imports ----

// >>> React
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Hub from './Hub';



export default function(WrappedComponent) {
  class HubChecker extends React.Component {

      constructor(props) {
       super(props);
       this.state = {hub: undefined};
       this.setHub = this.setHub.bind(this);


}
setHub = (hub) =>{
    console.log('sdfsd');
    this.setState({...this.state, 'hub': hub});
}
    componentWillMount() {

        console.log("pathname: "+this.props.location.pathname.substring(1));
		//
        // Database.findHubByUrl(this.props.location.pathname.substring(1))
        // .then((x) => {
        //     console.log('????');
        //         this.setHub(x);
		//
        // }).catch(function(e){
		//
        //     console.log("he2: " + e);
        //     browserHistory.push('/noaccess');
        // });




    }
    render() {
        if(this.state.hub == null)
            return <div>Loading</div>
        else{
            //console.log('he: ' + this.state.hub);
            const newProps = {
           hub: this.state.hub
         }
         // TODO may not be the best solution to place the Hub in the WrappedComponent
            return <WrappedComponent ><Hub {...newProps} {...this.props}/> </WrappedComponent>
}

    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticatedFull };
  }

  return connect(mapStateToProps)(HubChecker);

}
