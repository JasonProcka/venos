// --- Imports ----

// >>> React
import React from 'react';
import {connect} from 'react-redux';


import {bindActionCreators} from 'redux'
import * as Actions from '../../actions';

// >>> Material-UI
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class HubHeader extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			slideIndex: 0
		}
	}

    render() {
        return (
          <header className="hubJumbo">
            <div className="hubJumboWrapper">
							<div className="hubCreator">
								<div className="hubCreatorPicture"></div>
								<span className="hubCreatorName">Anonymous Bear</span>
							</div>
              <div className="hub-head-informations">
                <h3 className="hubTitle">{this.props.title}</h3>
                <p className="hubDescription">{this.props.description}</p>
              </div>
              <div className="hubButtons">
                <RaisedButton style={{
                    marginRight: "1em"
                }} id="button-create-drop" secondary={true} label="Create Drop" onClick={() => {
                    this.props.onAddFileClick();
                }}/>
                <FlatButton id="button-copy" style={{
                    color: "#FFF"
                }} label="Copy Link" />
              </div>
              <Tabs className="hubTabs" tabTemplateStyle={{
                fontWeight: 400,
                width: "auto"
              }} tabItemContainerStyle={{
                backgroundColor: "transparent",
                fontWeight: 400
              }} inkBarStyle={{
                background: "transparent"
              }} onChange={this.props.onTabChange} value={this.props.currentTab}>
                <Tab style={{
                    fontWeight: 400
                }} label="Drops" value={0}/>
                <Tab style={{
                    fontWeight: 400
                }} label="Bio" value={1} />
								<Tab style={{
										fontWeight: 400
								}} label="Quick Share" value={2} />
              </Tabs>
						</div>
          </header>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

function mapStateToProps(state, ownProps) {
    return {
        routing: state.routing
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HubHeader);
