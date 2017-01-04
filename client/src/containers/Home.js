// --- Imports ----

// >>> React
import React from 'react';
import {browserHistory} from 'react-router';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// >>> Material-UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

// >>> Styles
import '../styles/home.css';
import '../styles/grid.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
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
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default connect()(Home);
