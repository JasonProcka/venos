// --- Imports ----

// >>> React
import React from 'react';

import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

// >>> Material-UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


import VRequest from '../libs2/vrequest';

// >>> Styles
import '../styles/home.css';
import '../styles/grid.css';
class Home extends React.Component {
    constructor(props) {
        super(props);

		this.onTextChange.bind(this);
    }





	onTextChange(event){

		let value = event.target.value;
		if(value && value.trim().length === 4){
			this.props.dispatch(actions.enterQuickShareKey(value));
		}
		this.setState({quickShareKey: value});
	}




    render() {
        return (
            <div className="homeWrapper">
              <div className="introTop">
                <div className="introContent">
                  <h3>Hubs</h3>
                  <p>Publically and anonymously store valuable resources in a collaborative location</p>
                  <div className="introButtons">
                    <FlatButton className="learn" label="Learn More"></FlatButton>
                    <RaisedButton className="button-create-hub" onClick={() => this.props.dispatch(push('/create'))} label="Create Hub" secondary={true}/>
						<TextField
	      					hintText="Your code"
	      					floatingLabelText="Your code"
							onChange={(e) => {this.onTextChange(e)}}
	    				/>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators(actions, dispatch)
	}
}



export default connect(undefined)(Home);
