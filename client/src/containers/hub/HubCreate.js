// --- Imports ----

// >>> React
import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';

// >>> Redux
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';

// >>> Firebase
import Firebase from 'firebase';

// >>> ShortId
import shortid from 'shortid';

// >>> util
import util from 'util';

// >>> Consts
import {HubC} from '../../shared/models';

// >>> Containers
import CreateHubMoreOptions from '../CreateHub/MoreOptions.js';
import Footer from '../Footer';
import HubContent from './HubContent.js';

// >>> Material-UI and redux-form-material-ui
import { RaisedButton } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconCreate from 'material-ui/svg-icons/content/create';
import {Checkbox, RadioButtonGroup, SelectField, TextField, Toggle} from 'redux-form-material-ui'



// >>> Styles/CSS
import '../../styles/app.css'
import '../../styles/create-hub.css';

// >>> Status Constants
const STATUS_ENTER_DETAILS = 1;
const STATUS_CREATED_HUB = 2;
const STATUS_CREATED_ERROR = 3;

// function for validating the inputs
const validation = (values) => {
    const errors = {};

    if (!values.name)
        errors.name = "Please enter a name.";

    if (!values.description || !(/\S/.test(values.description)))
        errors.description = "Please enter a description.";

    // if(!values.customurl || !(/\S/.test(values.customurl)) ) {
    //   errors.customurl = "Please enter a custom url.";
    // }
    return errors;
}

// onToggle={
// 	(e) => {
// 		e.target.checked = e.target.checked ? true : false;
// 		e.target.value = e.target.checked;
// 		this.setState({...this.state, isUrlSwitchToggled: e.target.checked})
// 	}
//
//
// }

class HubCreate extends React.Component {

  	constructor(props) {
	    super(props);

	    this.state = {
			hub: {
				url: shortid()
			},
			isUrlSwitchToggled: false, // if the switch isn't toggeled we will use the random shortif above as url
	    	submitDisabled: true,
	    	status: this.props.hubcreated ? STATUS_CREATED_HUB : STATUS_ENTER_DETAILS
	    }

	}


	required(value){
		return value == null ? 'Required' : undefined
	}
	requiredUrl = (value) => {
		if(this.props && this.props.isUrlSwitchToggled)
			return value == null ? 'Required' : undefined
		return undefined;
	}


    handleFormSubmit = (values) => {
		console.log('kp');
		//{name, description, url, (user.uid - passed by method), isPublicHub, destructionTimeInHours}
		this.props.actions.createHub(
			{
				[HubC.NAME]: values.name,
				[HubC.DESCRIPTION]: values.description,
				[HubC.URL]: values.url ? values.url : this.state.hub.url,
				[HubC.DESTRUCTION_TIME_IN_HOURS]: 48
			}
		);

    };

    renderAuthenticationError() {
        if (this.props.authenticationError)
            return <div className="alert alert-danger">{this.props.authenticationError}</div>

        return <div></div>
    }


    renderDialogSpecificToStatus(status) {

        switch (status) {
			// If Details are about to be entered show this:
            case STATUS_ENTER_DETAILS:
                return (
                    <div className="dialog-special created shadow">
                        <div className="clearfix foyer-wrapper">
                            {this.renderAuthenticationError()}
                          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                            <Field
                              className="hubNamer hubFields"
                              autoComplete="off"
                              key={1}
                              name="name"
                              placeholder="Name your Hub"
                              component={TextField}
                              hintText="Name your Hub"
                              type="text"
                              validate={this.required}
                            />
            								<Field
                              className="hubDescriptor hubFields"
                              autoComplete="off"
            									key={2}
            									name="description"
                              placeholder="Describe your Hub"
            									component={TextField}
            									hintText="Describe your Hub"
            									type="text"
            									validate={this.required}
            								/>
                            <div id="urlOptional" className="clearfix">
              								<Field
                                className="urlToggle"
              									name="isUrlWriteable"
              									component={Toggle}
              								/>
              								<span className="urlLabel">{`hubs.venos.co/ `}</span>
              								<Field
                                className="urlInput"
              									key={3}
              									name="url"
              									component={TextField}
              									hintText={this.props.isUrlWriteable ? "your-custom-url" : this.state.hub.url}
              									disabled={!this.props.isUrlWriteable}
              									type="text"
              									validate={this.requiredUrl}
              								/>
              							</div>
                            <br />
                            <RaisedButton
                            className="createHub"
                							disabled={this.props.submitDisabled}
                							type="submit"
                							label="Create Hub"
                							secondary={true} />
                            <FlatButton className="showCustomUrl" label="More Options" />
                          </form>
                        </div>
                    </div>
                );

			// TODO, moving to the hub when a hub gets successfully created show this:
            case STATUS_CREATED_HUB:
                return (
                    <div className="dialog-special created shadow">
                        <div className="foyer-header">
                            <div className="linkarea">
                                <input className="copy-hublink mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" value="Copy"/>
                                <span className="hublink">
                                    <a href="#">venos.co/yournewhub</a>
                                </span>
                            </div>
                        </div>
                        <div className="foyer-wrapper">
                            <h4>Hub Creation Successful</h4>

                            <div className="foyer-interior">
                                <p>Congrats, your hub was successfully created.</p>
                                <input className="panel-finish mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" value="Okay"/>
                            </div>
                        </div>
                    </div>
                );

			// if any error occured show this:
            default: // STATUS_CREATED_ERROR not needed we show just this everytime
                return (
                    <div className="dialog-special created shadow">
                        <div className="foyer-header"></div>
                        <div className="foyer-wrapper">
                            <h4>Something unexpected happend</h4>
                            <div className="foyer-interior">
                                <p>{`An error occured, maybe you did not fill in everything correctly?`}</p>
                                <input className="panel-finish mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" value="Okay" onClick={this.props.dispatch(push('/dashboard'))}/>
                            </div>
                        </div>
                    </div>
                )


        }
    }

    render() {
        const dialog = this.renderDialogSpecificToStatus(this.state.status);
        return (
          <div className="createHubWrapper" id="create-wrapper">
              <ReactCSSTransitionGroup transitionName="dialog" transitionEnterTimeout={0} transitionLeaveTimeout={0} transitionAppear={true} transitionAppearTimeout={0}>
                  {dialog}
              </ReactCSSTransitionGroup>
              <div className="demoDrops">
                <div className="dropGrid grid-full">
                  <div className="col col-4">
                    <div className="demoDrop"></div>
                  </div>
                </div>
              </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
  		authenticationError: state.auth.error,
  		hubCreated: state.hub.created
	}
}


// The order of the decoration does not matter.

// Decorate with redux-form

HubCreate = (reduxForm({form: 'hubcreate'}, validation)(HubCreate));
// Decorate with connect to read form values
const selector = formValueSelector('hubcreate') // <-- same as form name

export default HubCreate = connect(
  state => {

    // can select values individually

    // or together as a group
    const { name, description, url, isUrlWriteable } = selector(state, 'name', 'description', 'url', 'isUrlWriteable')
	return {
      	name,
      	description,
      	url,
		isUrlWriteable,
	  	submitDisabled: (() => {
			console.log('t' + description);
	  	    if (name && name.trim().length > 0 && description && description.trim().length > 0)
				if(isUrlWriteable && url && url.trim().length > 0)
					return false;
				else if(!isUrlWriteable)
					return false;
	  		return true;
		})()
    }
}, (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
)(HubCreate)
