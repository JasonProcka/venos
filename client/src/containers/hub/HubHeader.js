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
            <div>
                <header className="hub-header">
                    <div>
                        <div className="hub-head-informations">
                            <h3 className="hub-title">{this.props.name}</h3>
                            <p className="hub-description">{this.props.description}</p>
                        </div>
                        <div className="hub-buttons">
                            <RaisedButton style={{
                                marginRight: "1em"
                            }} id="button-create-drop" secondary={true} label="Create Drop" onClick={() => {
                                this.props.onAddFileClick();
                            }}/>
                            <FlatButton id="button-copy" style={{
                                color: "#FFF"
                            }} label="Copy Link"/>
                        </div>
                    </div>
                    <Tabs className="tabs" tabTemplateStyle={{
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
                        }} label="Bio" value={1}/>
                    </Tabs>
                </header>
            </div>
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
